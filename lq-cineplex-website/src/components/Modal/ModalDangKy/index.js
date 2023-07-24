import { Autocomplete, Box, Button, Modal, TextField, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames/bind';
import styles from './ModalDangKy.module.scss';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers';
import AuthService from '~/services/authService';
import KhachHangService from '~/services/khachHangService';
import moment from 'moment';

const cx = classNames.bind(styles);

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fefcfb',
    boxShadow: 24,
    p: 1,
    borderRadius: 2,
};

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#999999',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#999999',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#999999',
        },
    },
});

const CssAutocomplete = styled(Autocomplete)({
    '& label.Mui-focused': {
        color: '#999999',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#999999',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#999999',
        },
    },
});

const CssDatePicker = styled(DatePicker)({
    '& label.Mui-focused': {
        color: '#999999',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#999999',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#999999',
        },
    },
});

function ModalDangKy() {
    const { openModalDangKy, setOpenModalDangKy, setOpenModalDangNhap } = useContext(CinemaContext);
    const [hoTen, setHoTen] = useState('');
    const [dienThoai, setDienThoai] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gioiTinh, setGioiTinh] = useState(null);
    const [ngaySinh, setNgaySinh] = useState(null);

    const handleCloseModal = () => {
        setOpenModalDangKy(false);
    };

    const handleChangeHoTen = (e) => {
        setHoTen(e.target.value);
    };

    const handleChangeDienThoai = (e) => {
        setDienThoai(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleChangeGioiTinh = (_, value) => {
        setGioiTinh(value);
    };

    const handleDangKy = () => {
        if (password === confirmPassword) {
            AuthService.register(email, email, password, ['cus']).then(() => {
                const newKhachHang = {};
                newKhachHang.ten = hoTen;
                newKhachHang.dienThoai = dienThoai;
                newKhachHang.gioiTinh = gioiTinh;
                newKhachHang.email = email;
                newKhachHang.ngaySinh = moment(ngaySinh).format('YYYY-MM-DD');

                const fetchApiThemKhachHang = async () => {
                    await KhachHangService.addKhachHang(newKhachHang).then((res) => {
                        console.log(res);
                    });
                };
                fetchApiThemKhachHang();
                setOpenModalDangKy(false);
                setOpenModalDangNhap(true);
            });
        } else {
            alert('Xác nhận password không đúng!');
        }
    };

    return (
        <Modal
            open={openModalDangKy}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ backdropFilter: 'blur(2px)' }}
        >
            <Box sx={{ ...style, width: 520, height: 'auto' }} className={cx('container-modal')}>
                <div className={cx('header-modal')}>
                    <div className={cx('title-modal')}>Đăng Ký</div>
                    {/* Button close */}
                    <Button
                        sx={{
                            color: '#C92522',
                            '&:hover': {
                                color: '#8d1a18',
                            },
                        }}
                        onClick={handleCloseModal}
                    >
                        <ClearIcon sx={{ fontSize: 35 }} />
                    </Button>
                </div>
                <div className={cx('wrapper-modal')}>
                    {/* Họ và tên */}
                    <div className={cx('text-field')}>
                        <CssTextField size="small" label="Họ tên" onChange={handleChangeHoTen} />
                    </div>
                    {/* So dien thoai va gioi tinh */}
                    <div className={cx('text-field')}>
                        <div className={cx('text-field-sub')}>
                            {/* So dien thoai */}
                            <CssTextField
                                className={cx('text-field-item')}
                                size="small"
                                label="Số điện thoại"
                                onChange={handleChangeDienThoai}
                            />
                            {/* Gioi tinh */}
                            <CssAutocomplete
                                className={cx('text-2xl', 'text-field-item')}
                                value={gioiTinh}
                                options={['Nam', 'Nữ', 'Khác'].map((item) => item)}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Giới tính" />}
                                onChange={handleChangeGioiTinh}
                                sx={{ bgcolor: '#fefcfb' }}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className={cx('text-field')}>
                        <CssTextField size="small" label="Email" onChange={handleChangeEmail} />
                    </div>
                    {/* Mat khau */}
                    <div className={cx('text-field')}>
                        <div className={cx('text-field-sub')}>
                            {/* Mat Khau */}
                            <CssTextField
                                className={cx('text-field-item')}
                                size="small"
                                label="Mật khẩu"
                                type="password"
                                onChange={handleChangePassword}
                            />
                            {/* Xac nhan mat khau */}
                            <CssTextField
                                className={cx('text-field-item')}
                                size="small"
                                label="Xác nhận mật khẩu"
                                type="password"
                                onChange={handleChangeConfirmPassword}
                            />
                        </div>
                    </div>
                    {/* Ngay Sinh */}
                    <div className={cx('text-field')}>
                        <CssDatePicker
                            label="Chọn ngày sinh"
                            value={ngaySinh}
                            onChange={(newValue) => setNgaySinh(newValue)}
                            renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </div>
                </div>
                <div className={cx('signup-button')}>
                    {/* Button Dang Ky */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            width: '100%',
                            color: '#fff',
                            padding: '10px',
                            backgroundColor: '#C92522',
                            '&:hover': {
                                backgroundColor: '#8d1a18',
                            },
                        }}
                        onClick={handleDangKy}
                    >
                        Đăng ký
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalDangKy;
