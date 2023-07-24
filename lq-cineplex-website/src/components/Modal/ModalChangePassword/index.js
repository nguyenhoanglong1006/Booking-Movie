import { Box, Button, Modal, TextField, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames/bind';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './ModalChangePassword.module.scss';
import AuthService from '~/services/authService';
var bcrypt = require('bcryptjs');
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

function ModalChangePassword({ acc }) {
    const { openModalChangePassword, setOpenModalChangePassword } = useContext(CinemaContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCloseModal = () => {
        setOpenModalChangePassword(false);
    };

    const onChangeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleChangePassword = () => {
        bcrypt.compare(currentPassword, acc.password).then((res) => {
            const updateAccountUser = {};
            updateAccountUser.id = acc.id;
            updateAccountUser.username = acc.username;
            updateAccountUser.email = acc.email;
            updateAccountUser.password = newPassword;
            updateAccountUser.roles = acc.roles;
 
            if (res) {
                const fetchApi = async () => {
                    await AuthService.updateAccountUser(updateAccountUser).then(() => {
                        alert('Cập nhật mật khẩu thành công');
                        setOpenModalChangePassword(false);
                    });
                };
                fetchApi();
            } else {
                alert('Mật khẩu hiện tại không đúng');
            }
        });
    };

    return (
        <Modal
            open={openModalChangePassword}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ backdropFilter: 'blur(2px)' }}
        >
            {/* <form> */}
            <Box sx={{ ...style, width: 520, height: 'auto' }} className={cx('container-modal')}>
                <div className={cx('header-modal')}>
                    <div className={cx('title-modal')}>Đổi mật khẩu</div>
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
                    {/* Current Password */}
                    <div className={cx('text-field')}>
                        <CssTextField
                            size="small"
                            label="Mật khẩu hiện tại"
                            type="password"
                            value={currentPassword}
                            onChange={onChangeCurrentPassword}
                            error={currentPassword === ''}
                            helperText={currentPassword === '' ? 'Nhập mật khẩu hiện tại' : ''}
                        />
                    </div>
                    {/* New Password */}
                    <div className={cx('text-field')}>
                        <CssTextField
                            size="small"
                            label="Mật khẩu mới"
                            type="password"
                            value={newPassword}
                            onChange={onChangeNewPassword}
                            error={
                                newPassword !== '' &&
                                !newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
                            }
                            helperText={
                                newPassword !== '' &&
                                !newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
                                    ? 'Mật khẩu có ít nhất 8 ký tự phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số và có thể chứa các ký tự đặc biệt'
                                    : ''
                            }
                        />
                    </div>
                    {/* Confirm Password */}
                    <div className={cx('text-field')}>
                        <CssTextField
                            size="small"
                            label="Xác nhận mật khẩu"
                            type="password"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            error={confirmPassword !== '' && confirmPassword !== newPassword}
                            helperText={
                                confirmPassword !== '' && confirmPassword !== newPassword ? 'Mật khẩu không khớp' : ''
                            }
                        />
                    </div>
                </div>

                <div className={cx('signup-button')}>
                    {/* Button Luu */}
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
                        onClick={handleChangePassword}
                    >
                        Lưu
                    </Button>
                </div>
            </Box>
            {/* </form> */}
        </Modal>
    );
}

export default ModalChangePassword;
