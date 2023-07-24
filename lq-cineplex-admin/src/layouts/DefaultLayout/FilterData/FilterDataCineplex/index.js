import { Box, Pagination, styled } from '@mui/material';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import * as React from 'react';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';

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

function FilterDataCineplex() {
    const { dsRap } = useContext(CinemaContext);
    const { setSelectedRapRows, selectionModelRap, setSelectionModelRap } = useContext(CinemaContext);
    // Load Danh sach Rap
    dsRap.map((rap) => {
        rap.diachi = rap.diaChi.phuongXa + ' - ' + rap.diaChi.quanHuyen + ' - ' + rap.diaChi.tinhThanhPho;
        const { diaChi, ...rest } = rap;
        return { ...rest };
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
        {
            field: 'tenRap',
            headerName: 'Tên rạp',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            editable: false,
        },
        {
            field: 'hinhAnh',
            headerName: 'Hình ảnh rạp',
            width: 150,
            editable: false,
            renderCell: (data) => <img src={data.value} alt="hinh anh rap" className="h-12 object-cover" />,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'moTa',
            headerName: 'Mô tả',
            width: 300,
            editable: false,
            headerAlign: 'center',
        },
        {
            field: 'diachi',
            headerName: 'Địa chỉ',
            width: 250,
            editable: false,
            headerAlign: 'center',
        },

        {
            field: 'trangThai',
            headerName: 'Trạng Thái',
            width: 150,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    return (
        <Box sx={{ height: '65vh', width: '100%' }}>
            <StyledDataGrid
                checkboxSelection
                rows={dsRap}
                columns={columns}
                pagination
                pageSize={8}
                rowsPerPageOptions={[8]}
                components={{
                    Pagination: CustomPagination,
                }}
                selectionModel={selectionModelRap}
                onSelectionModelChange={(selection) => {
                    const selectionSet = new Set(selectionModelRap);
                    const result = selection.filter((s) => !selectionSet.has(s));
                    selection.length > 1 ? setSelectionModelRap(result) : setSelectionModelRap(selection);
                    const selectedRows = dsRap.filter((row) => row.id === result[0]);
                    setSelectedRapRows(selectedRows);
                }}
            />
        </Box>
    );
}

export default FilterDataCineplex;
