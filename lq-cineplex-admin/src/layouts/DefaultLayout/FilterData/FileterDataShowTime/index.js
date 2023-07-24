import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { Box, Pagination, styled } from '@mui/material';

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

function FilterDataShowTime() {
    const [listLichChieu, setListLichChieu] = useState([]);
    const { dsLichChieu } = useContext(CinemaContext);

    // dsLichChieu.map((lichchieu) => {
    //     const ngaychieu = moment(new Date(lichchieu.ngayChieu)).locale('vi', vi).format('dddd, DD/MM/YYYY');

    //     lichchieu.tenphim = lichchieu.phim.tenPhim;
    //     lichchieu.tenphongchieu = lichchieu.phongChieu.tenPhongChieu;
    //     lichchieu.tenrap = lichchieu.phongChieu.rap.tenRap;
    //     lichchieu.giobatdau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
    //     lichchieu.gioketthuc = moment(lichchieu.gioKetThuc, 'HH:mm:ss').format('HH:mm');
    //     lichchieu.ngaychieu = ngaychieu.charAt(0).toUpperCase() + ngaychieu.slice(1);
    //     lichchieu.trangthai = lichchieu.trangThai;

    //     const { phim, phongChieu, gioBatDau, gioKetThuc, ngayChieu, trangThai, ...rest } = lichchieu;
    //     return { ...rest };
    // });

    useEffect(() => {
        const lichChieu = [];

        dsLichChieu.forEach((lichchieu) => {
            const dateLichChieu = moment(new Date(lichchieu.ngayChieu)).locale('vi', vi).format('YYYY-MM-DD');
            const dateHienTai = moment(new Date()).locale('vi', vi).format('YYYY-MM-DD');
            if (
                moment(dateLichChieu).isSameOrAfter(moment(dateHienTai))
                // moment(new Date()).locale('vi', vi).format('DD/MM/YYYY')
            ) {
                const ngaychieu = moment(new Date(lichchieu.ngayChieu)).locale('vi', vi).format('dddd, DD/MM/YYYY');

                lichchieu.tenphim = lichchieu.phim.tenPhim;
                lichchieu.tenphongchieu = lichchieu.phongChieu.tenPhongChieu;
                lichchieu.tenrap = lichchieu.phongChieu.rap.tenRap;
                lichchieu.giobatdau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
                lichchieu.gioketthuc = moment(lichchieu.gioKetThuc, 'HH:mm:ss').format('HH:mm');
                lichchieu.ngaychieu = ngaychieu.charAt(0).toUpperCase() + ngaychieu.slice(1);
                lichchieu.trangthai = lichchieu.trangThai;
                lichChieu.push(lichchieu);
            }
        });
        setListLichChieu(lichChieu);
    }, [dsLichChieu]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', align: 'center' },
        {
            field: 'giobatdau',
            headerName: 'Giờ bắt đầu',
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'gioketthuc',
            headerName: 'Giờ kết thúc',
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ngaychieu',
            headerName: 'Ngày chiếu',
            width: 180,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenphim',
            headerName: 'Tên Phim',
            width: 250,
            editable: false,
            headerAlign: 'center',
        },
        {
            field: 'tenphongchieu',
            headerName: 'Phòng Chiếu',
            width: 130,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'tenrap',
            headerName: 'Rạp',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },

        {
            field: 'trangthai',
            headerName: 'Trạng Thái',
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    return (
        <Box sx={{ height: '65vh', width: '100%' }}>
            <StyledDataGrid
                checkboxSelection
                rows={listLichChieu}
                columns={columns}
                pagination
                pageSize={8}
                rowsPerPageOptions={[8]}
                components={{
                    Pagination: CustomPagination,
                }}
            />
        </Box>
    );
}

export default FilterDataShowTime;
