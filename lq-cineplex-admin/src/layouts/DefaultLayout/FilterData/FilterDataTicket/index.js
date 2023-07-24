import Box from '@mui/material/Box';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { Pagination, styled } from '@mui/material';

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    };
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="error"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-cell': {
        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    ...customCheckbox(theme),
}));

function FilterDataTicket() {
    const { dsVe } = useContext(CinemaContext);

    dsVe.map((ve) => {
        ve.tenPhim = ve.lichChieu.phim.tenPhim;
        ve.tenPhongChieu = ve.lichChieu.phongChieu.tenPhongChieu;
        ve.tenRap = ve.lichChieu.phongChieu.rap.tenRap;
        ve.tenLoaiPhongChieu = ve.lichChieu.phongChieu.loaiPhongChieu.tenLoaiPhongChieu;
        ve.gioBatDau = moment(ve.lichChieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
        const ngayChieu = moment(ve.lichChieu.ngayChieu).locale('vi', vi).format('dddd, DD/MM/YYYY');
        ve.ngayChieu = ngayChieu.charAt(0).toUpperCase() + ngayChieu.slice(1);
        ve.giave = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ve.giaVe);
        const { lichChieu, phim, phongChieu, ...rest } = ve;
        return { ...rest };
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
        {
            field: 'gioBatDau',
            headerName: 'Giờ bắt đầu',
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ngayChieu',
            headerName: 'Ngày chiếu',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenPhim',
            headerName: 'Tên phim',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenPhongChieu',
            headerName: 'Tên phòng chiếu',
            width: 150,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenLoaiPhongChieu',
            headerName: 'Tên loại phòng chiếu',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenRap',
            headerName: 'Tên rạp',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'giave',
            headerName: 'Giá vé',
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    return (
        <Box sx={{ height: '77vh', width: '100%' }}>
            <StyledDataGrid
                checkboxSelection
                rows={dsVe}
                columns={columns}
                pagination
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{
                    Pagination: CustomPagination,
                }}
            />
        </Box>
    );
}

export default FilterDataTicket;
