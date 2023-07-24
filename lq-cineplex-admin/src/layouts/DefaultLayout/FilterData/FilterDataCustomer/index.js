import { Box, Pagination, styled } from '@mui/material';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import moment from 'moment';
import vi from 'moment/locale/vi';
import KhachHangService from '~/services/khachHangService';

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
function FilterDataCustomer() {
    const [dskhachhang, setDsKhachHang] = useState([]);

    // Load danh sach khach hang
    useEffect(() => {
        const fetchDsKhachHang = async () => {
            const res = await KhachHangService.getDsKhachHang();
            setDsKhachHang(res);
        };
        fetchDsKhachHang();
    }, []);

    dskhachhang.map((khachhang) => {
        const ngaysinh = moment(new Date(khachhang.ngaySinh)).locale('vi', vi).format(' DD/MM/YYYY');
        khachhang.ngaysinh = ngaysinh.charAt(0).toUpperCase() + ngaysinh.slice(1);
        khachhang.diachi =
            khachhang.diaChi !== null
                ? khachhang.diaChi.phuongXa + '-' + khachhang.diaChi.quanHuyen + '-' + khachhang.diaChi.tinhThanhPho
                : 'Chưa cập nhật';
        const { listKhachHang, ...rest } = khachhang;
        return { ...rest };
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: false, headerAlign: 'center', align: 'center' },
        {
            field: 'ten',
            headerName: 'Tên khách hàng',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ngaysinh',
            headerName: 'Ngày Sinh',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'gioiTinh',
            headerName: 'Giới tính',
            width: 150,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (data) => <img src={data.value} alt="poster" className="h-16 object-cover p-1" />,
        },
        {
            field: 'dienThoai',
            headerName: 'Điện thoại',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'diachi',
            headerName: 'Địa chỉ',
            width: 250,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    return (
        <Box sx={{ height: '65vh', width: '100%' }}>
            <StyledDataGrid
                checkboxSelection
                rows={dskhachhang}
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

export default FilterDataCustomer;
