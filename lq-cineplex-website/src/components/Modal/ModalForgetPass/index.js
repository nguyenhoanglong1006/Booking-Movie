import { Box, Button, Modal, TextField, styled } from '@mui/material';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames/bind';
import styles from './ModalForgetPass.module.scss';
import ClearIcon from '@mui/icons-material/Clear';

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

function ModalForgetPass() {
    const { openModalForgetPass, setOpenModalForgetPass } = useContext(CinemaContext);

    const handleCloseModal = () => {
        setOpenModalForgetPass(false);
    };

    return (
        <Modal
            open={openModalForgetPass}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ backdropFilter: 'blur(2px)' }}
        >
            <Box sx={{ ...style, width: 520, height: 'auto' }} className={cx('container-modal')}>
                <div className={cx('header-modal')}>
                    <div className={cx('title-modal')}>Quên mật khẩu</div>
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
                <div className={cx('text-note')}>Vui lòng cung cấp email đăng nhập, chúng tôi sẽ cấp lại cho bạn.</div>
                <div className={cx('wrapper-modal')}>
                    {/* Email */}
                    <div className={cx('text-field')}>
                        <CssTextField size="small" label="Email" />
                    </div>
                </div>

                <div className={cx('signup-button')}>
                    {/* Button Cap lai mat khau */}
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
                    >
                        Cấp lại mật khẩu
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalForgetPass;
