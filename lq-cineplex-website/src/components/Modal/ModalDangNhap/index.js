import { Box, Button, Modal, TextField, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames/bind';
import styles from './ModalDangNhap.module.scss';
import ClearIcon from '@mui/icons-material/Clear';
import AuthService from '~/services/authService';

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

function ModalDangNhap() {
    const { openModalDangNhap, setOpenModalDangNhap, setOpenModalForgetPass } = useContext(CinemaContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
    const [err, setErr] = useState(false);

    const handleCloseModal = () => {
        setErr(false);
 

    const handleCloseModal = () => {
 
        setOpenModalDangNhap(false);
    };

    const handleOpenModalForgetPass = () => {
        setOpenModalDangNhap(false);
        setOpenModalForgetPass(true);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
 
        AuthService.login(username, password)
            .then(() => {
                setErr(false);
                window.location.reload();
            })
            .catch(() => {
                setErr(true);
            });
    };

    return (
        <Modal
            open={openModalDangNhap}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ backdropFilter: 'blur(2px)' }}
        >
            <form>
                <Box sx={{ ...style, width: 520, height: 'auto' }} className={cx('container-modal')}>
                    <div className={cx('header-modal')}>
                        <div className={cx('title-modal')}>Đăng nhập</div>
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
                    <div className={cx('text-note')}>Vui lòng đăng nhập để đặt vé xem phim</div>
 
                    {err ? <div className={cx('text-error')}>(*)Email hoặc mật khẩu không chính xác</div> : <></>}

                    <div className={cx('wrapper-modal')}>
                        {/* Username */}
                        <div className={cx('text-field')}>
                            <CssTextField
                                size="small"
                                label="Email"
                                error={username !== '' && !username.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}
                                helperText={
                                    username !== '' && !username.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                                        ? 'Email không hợp lệ, email bao gồm "@"'
                                        : ''
                                }
                                onChange={onChangeUsername}
                            />
 
                        </div>
                        {/* Password */}
                        <div className={cx('text-field')}>
                            <CssTextField size="small" label="Mật khẩu" type="password" onChange={onChangePassword} />
                        </div>
                    </div>
                    <a href="# " className={cx('forgot-pass')} onClick={handleOpenModalForgetPass}>
                        Quên mật khẩu?
                    </a>
                    <div className={cx('signup-button')}>
                        {/* Button Dang nhập */}
                        <Button
                            type="submit"
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
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </Box>
            </form>
        </Modal>
    );
}

export default ModalDangNhap;
