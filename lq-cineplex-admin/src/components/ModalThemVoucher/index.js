import { Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemRap.module.scss';
import React, { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import UploadFileService from '~/services/uploadFileService';
import moment from 'moment';
import 'moment-timezone';
import VoucherService from '~/services/voucherService';
import { DatePicker } from '@mui/x-date-pickers';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 2,
};

function ModalThemVoucher({ voucher }) {
    const { openModalVoucher, setOpenModalVoucher, setDsVoucher, setSelectedVoucherRows, setSelectionModelVoucher } =
        useContext(CinemaContext);
    const [tenVoucher, setTenVoucher] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState(null);
    const [ngayKetThuc, setNgayKetThuc] = useState(null);
    const [soLuong, setSoLuong] = useState('');
    const [giaTri, setGiaTri] = useState('');
    const [maVoucher, setMaVoucher] = useState('');

    const handleCloseModal = () => {
        setOpenModalVoucher(false);
    };

    const handleChangeTenVoucher = (e) => {
        setTenVoucher(e.target.value);
    };

    const handleChangeSoLuong = (e) => {
        setSoLuong(e.target.value);
    };

    const handleChangeGiaTri = (e) => {
        setGiaTri(e.target.value);
    };
    const handleChangeMaVoucher = (e) => {
        setMaVoucher(e.target.value);
    };

    const handleLuuVoucher = () => {
        const formData = new FormData();
        const fetchApiUploadFile = async () => {
            await UploadFileService.uploadFile(formData).then((res) => {
                const newVoucher = {};
                newVoucher.ngayBatDau = moment(ngayBatDau).tz('Asia/Ho_Chi_Minh').toDate();
                newVoucher.ngayKetThuc = moment(ngayKetThuc).tz('Asia/Ho_Chi_Minh').toDate();
                newVoucher.tenVoucher = tenVoucher;
                newVoucher.soLuong = soLuong;
                newVoucher.giaTri = giaTri;
                newVoucher.maVoucher = maVoucher;
                newVoucher.trangThai = 'Đang áp dụng';
                const fetchApiThemVoucher = async () => {
                    await VoucherService.addVoucher(newVoucher).then(() => {
                        const fetchApi = async () => {
                            const res = await VoucherService.getDsVoucher();
                            setDsVoucher(res);
                        };
                        fetchApi();
                        setOpenModalVoucher(false);
                    });
                };
                fetchApiThemVoucher();
            });
        };
        fetchApiUploadFile();
    };

    return (
        <Modal
            open={openModalVoucher}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 'fit-content' }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>Them voucher</div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* Ten Rap */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={tenVoucher}
                                id="outlined-basic"
                                label="Tên rạp"
                                variant="outlined"
                                onChange={handleChangeTenVoucher}
                            />
                        </div>

                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày bắt đầu"
                                value={ngayBatDau}
                                onChange={(newValue) => {
                                    setNgayBatDau(newValue);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>

                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày kết thúc"
                                value={ngayKetThuc}
                                onChange={(newValue) => {
                                    setNgayKetThuc(newValue);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>

                        {/* Ten Rap */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={maVoucher}
                                id="outlined-basic"
                                label="Mã voucher"
                                variant="outlined"
                                onChange={handleChangeMaVoucher}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* Ten Rap */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={soLuong}
                                id="outlined-basic"
                                label="Số lượng"
                                variant="outlined"
                                onChange={handleChangeSoLuong}
                            />
                        </div>
                        {/* Ten Rap */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={giaTri}
                                id="outlined-basic"
                                label="Gía trị"
                                variant="outlined"
                                onChange={handleChangeGiaTri}
                            />
                        </div>
                        {/* trangThai */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                label="Trạng thái"
                                variant="outlined"
                                disabled
                                defaultValue={'Đang áp dụng'}
                            />
                        </div>
                    </Box>
                </div>
                <div className={cx('group-button')}>
                    {/* Button Huy */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '8px',

                            '&:hover': {
                                backgroundColor: '#ff0000',
                                color: 'white',
                            },
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </Button>
                    {/* Button them rap */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '8px',

                            '&:hover': {
                                backgroundColor: '#339966',
                                color: 'white',
                            },
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleLuuVoucher}
                    >
                        Thêm Voucher
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemVoucher;
