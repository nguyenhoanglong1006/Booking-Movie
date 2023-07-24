import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemBapNuoc.module.scss';
import nopicture from '~/assets/no-picture.png';
import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import DichVuService from '~/services/dichVuService';
import UploadFileService from '~/services/uploadFileService';

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

function ModalThemBapNuoc({ dichvu }) {
    const { openModalBapNuoc, setOpenModalBapNuoc, setDsDichVu, setSelectedDichVuRows, setSelectionModelDichVu } =
        useContext(CinemaContext);
    const [poster, setPoster] = useState(null);
    const [listLoaiDichVu, setListLoaiDichVu] = useState([]);
    const [loaiDichVu, setLoaiDichVu] = useState(null);
    const [tenDichVu, setTenDichVu] = useState('');
    const [donGia, setDonGia] = useState('');
    const [moTa, setMoTa] = useState('');

    useEffect(() => {
        setTenDichVu(dichvu.length !== 0 ? dichvu[0].tenDichVu : '');
        setDonGia(dichvu.length !== 0 ? dichvu[0].donGia : '');
        setPoster(dichvu.length !== 0 ? { preview: dichvu[0].hinhAnh } : null);
        setMoTa(dichvu.length !== 0 ? dichvu[0].moTa : '');
        setLoaiDichVu(dichvu.length !== 0 ? dichvu[0].loaiDichVu : null);
    }, [dichvu]);

    // Load ds loai phong chieu
    useEffect(() => {
        const fetchApiLoaiDichVu = async () => {
            const res = await DichVuService.getDsLoaiDichVu();
            setListLoaiDichVu(res);
        };
        fetchApiLoaiDichVu();
    }, []);

    const handleCloseModal = () => {
        setOpenModalBapNuoc(false);
        setSelectionModelDichVu([]);
        setSelectedDichVuRows([]);
    };

    const handleChangeTenDichVu = (e) => {
        setTenDichVu(e.target.value);
    };

    const handleChangeDonGia = (e) => {
        const donGia = parseInt(e.target.value);
        setDonGia(donGia);
    };

    const handleChangeMoTa = (e) => {
        setMoTa(e.target.value);
    };

    const handleChangeLoaiDichVu = (_, value) => {
        setLoaiDichVu(value);
    };

    var handlePreviewIMG = (e) => {
        if (!!poster) URL.revokeObjectURL(poster?.preview);
        const selectedFiles = e.target.files;
        const SIZE_FILE = 62914560; // = 60MB
        var img = selectedFiles[0];
        if (img.size > SIZE_FILE) {
            alert('Dung lượng mỗi ảnh  tối đa là 60MB');
            return;
        }
        img.preview = URL.createObjectURL(img);
        e.target.value = null;
        setPoster(img);
    };

    const renderPreviewIMG = () => {
        if (!!poster) {
            return (
                <Button
                    type="button"
                    className={cx('absolute -top-1 -right-1 m-0 p-0 ')}
                    onClick={() => {
                        URL.revokeObjectURL(poster.preview);
                        setPoster(null);
                    }}
                >
                    <img
                        src={poster.preview}
                        alt={poster.name}
                        className={cx('shadow-md object-contain')}
                        style={{ height: '115px' }}
                    />
                </Button>
            );
        }
    };

    const handleThemDichVu = () => {
        const formData = new FormData();
        formData.append('file', poster);

        const fetchApiUploadFile = async () => {
            await UploadFileService.uploadFile(formData).then((res) => {
                const newDichVu = {};
                newDichVu.tenDichVu = tenDichVu;
                newDichVu.donGia = donGia;
                newDichVu.hinhAnh = res;
                newDichVu.loaiDichVu = loaiDichVu;
                newDichVu.moTa = moTa;
                const fetchApiThemDichVu = async () => {
                    await DichVuService.addDichVu(newDichVu).then(() => {
                        const fetchApi = async () => {
                            const res = await DichVuService.getDsDichVu();
                            setDsDichVu(res);
                        };
                        fetchApi();
                        setOpenModalBapNuoc(false);
                    });
                };
                fetchApiThemDichVu();
            });
        };
        fetchApiUploadFile();
    };

    const handleCapNhatDichVu = () => {
        if (poster.size) {
            const formData = new FormData();
            formData.append('file', poster);

            const fetchApiUploadFile = async () => {
                await UploadFileService.uploadFile(formData).then((res) => {
                    const updateDichVu = {};
                    updateDichVu.id = dichvu[0].id;
                    updateDichVu.tenDichVu = tenDichVu;
                    updateDichVu.donGia = donGia;
                    updateDichVu.moTa = moTa;
                    updateDichVu.trangThai = 'Con';
                    updateDichVu.loaiDichVu = loaiDichVu;
                    updateDichVu.hinhAnh = res;

                    const fetchApiUpdateDichVu = async () => {
                        await DichVuService.updateDichVu(updateDichVu).then(() => {
                            const fetchApiDsDichVu = async () => {
                                const res = await DichVuService.getDsDichVu();
                                setDsDichVu(res);
                            };
                            fetchApiDsDichVu();
                            setOpenModalBapNuoc(false);
                        });
                    };
                    fetchApiUpdateDichVu();
                    setLoaiDichVu('');
                    setPoster(null);
                    setSelectedDichVuRows([]);
                    setSelectionModelDichVu([]);
                });
            };
            fetchApiUploadFile();
        } else {
            const updateDichVu = {};
            updateDichVu.id = dichvu[0].id;
            updateDichVu.tenDichVu = tenDichVu;
            updateDichVu.donGia = donGia;
            updateDichVu.moTa = moTa;
            updateDichVu.trangThai = 'Con';
            updateDichVu.loaiDichVu = loaiDichVu;
            updateDichVu.hinhAnh = dichvu[0].hinhAnh;

            const fetchApiUpdateDichVu = async () => {
                await DichVuService.updateDichVu(updateDichVu).then(() => {
                    const fetchApiDsDichVu = async () => {
                        const res = await DichVuService.getDsDichVu();
                        setDsDichVu(res);
                    };
                    fetchApiDsDichVu();
                    setOpenModalBapNuoc(false);
                });
            };
            fetchApiUpdateDichVu();
            setLoaiDichVu([]);
            setPoster(null);
            setSelectedDichVuRows([]);
            setSelectionModelDichVu([]);
        }
    };

    return (
        <Modal
            open={openModalBapNuoc}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 380 }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>
                    {dichvu.length === 0 ? 'Thông tin dịch vu' : 'Sửa thông tin dịch vụ'}
                </div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* Ten dich vu */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={tenDichVu}
                                id="outlined-basic"
                                label="Tên dịch vụ"
                                variant="outlined"
                                onChange={handleChangeTenDichVu}
                            />
                        </div>
                        {/* Loai dich vu */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                value={loaiDichVu ? loaiDichVu : null}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={listLoaiDichVu}
                                getOptionLabel={(item) => item.tenLoaiDichVu}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Loại dịch vụ" />}
                                onChange={handleChangeLoaiDichVu}
                            />
                        </div>
                        {/* Mo ta dich vu */}
                        <div className={cx('text-field')}>
                            <TextField
                                id="outlined-multiline-static"
                                value={moTa}
                                label="Mô tả dịch vụ"
                                multiline
                                rows={3}
                                onChange={handleChangeMoTa}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* Don gia */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={donGia}
                                id="outlined-basic"
                                label="Đơn giá"
                                variant="outlined"
                                onChange={handleChangeDonGia}
                            />
                        </div>
                        {/* anh dich vu */}
                        <div className={cx('text-field')}>
                            {!poster ? (
                                <Button color="success" component="label">
                                    <img
                                        src={nopicture}
                                        alt="no img"
                                        className={cx('object-contain')}
                                        style={{ height: '112px' }}
                                    />
                                    <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                </Button>
                            ) : (
                                renderPreviewIMG()
                            )}
                            <Button variant="outlined" color="success" component="label">
                                Thêm hình ảnh dịch vụ
                                <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                            </Button>
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
                    {/* Button Them bap nuoc */}
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
                        onClick={dichvu.length === 0 ? handleThemDichVu : handleCapNhatDichVu}
                    >
                        {dichvu.length === 0 ? 'Thêm rạp' : 'Cập nhật'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemBapNuoc;
