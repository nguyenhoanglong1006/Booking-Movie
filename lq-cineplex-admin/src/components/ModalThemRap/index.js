import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemRap.module.scss';
import nopicture from '~/assets/no-picture.png';
import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import UploadFileService from '~/services/uploadFileService';
import RapService from '~/services/rapService';
import axios from 'axios';

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

function ModalThemRap({ rap }) {
    const { openModalRap, setOpenModalRap, setDsRap, setSelectedRapRows, setSelectionModelRap } =
        useContext(CinemaContext);
    const [tenRap, setTenRap] = useState('');
    const [listPhuongXa, setListPhuongXa] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [phuongXa, setPhuongXa] = useState(null);
    const [quanHuyen, setQuanHuyen] = useState(null);
    const [tinhThanhPho, setTinhThanhPho] = useState(null);
    const [moTa, setMoTa] = useState('');
    const [poster, setPoster] = useState(null);

    //Load Init state
    useEffect(() => {
        if (rap.length === 0) {
            axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                setListTinhThanhPho(res.data.results);
            });
            setTinhThanhPho(null);
            setListQuanHuyen([]);
            setQuanHuyen(null);
            setListPhuongXa([]);
            setPhuongXa(null);
            setTenRap('');
            setMoTa('');
            setPoster(null);
        } else {
            axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                setListTinhThanhPho(res.data.results);
                const tinhThanhPho = rap[0].diaChi.tinhThanhPho;
                const tinhThanhPhoObj = res.data.results.filter((t) => t.province_name === tinhThanhPho)[0];
                setTinhThanhPho(tinhThanhPhoObj);
                axios
                    .get('https://vapi.vnappmob.com/api/province/district/' + tinhThanhPhoObj.province_id)
                    .then((res) => {
                        setListQuanHuyen(res.data.results);
                        const quanHuyen = rap[0].diaChi.quanHuyen;
                        const quanHuyenObj = res.data.results.filter((t) => t.district_name === quanHuyen)[0];
                        setQuanHuyen(quanHuyenObj);
                        axios
                            .get('https://vapi.vnappmob.com/api/province/ward/' + quanHuyenObj.district_id)
                            .then((res) => {
                                setListPhuongXa(res.data.results);
                                const phuongXa = rap[0].diaChi.phuongXa;
                                const phuongXaObj = res.data.results.filter((t) => t.ward_name === phuongXa)[0];
                                setPhuongXa(phuongXaObj);
                            });
                    });
            });
            setTenRap(rap[0].tenRap);
            setMoTa(rap[0].moTa);
            setPoster({ preview: rap[0].hinhAnh });
        }
    }, [rap]);

    const handleChangeTenRap = (e) => {
        setTenRap(e.target.value);
    };

    const handleChangePhuongXa = (_, value) => {
        setPhuongXa(value);
    };

    const handleChangeQuanHuyen = (_, value) => {
        setPhuongXa('');
        setListPhuongXa([]);

        setQuanHuyen(value);
        if (value !== null) {
            axios.get('https://vapi.vnappmob.com/api/province/ward/' + value.district_id).then((res) => {
                setListPhuongXa(res.data.results);
            });
        }
    };

    const handleChangeTinhThanhPho = (_, value) => {
        setListQuanHuyen([]);
        setListPhuongXa([]);
        setQuanHuyen('');
        setPhuongXa('');

        setTinhThanhPho(value);
        if (value !== null) {
            axios.get('https://vapi.vnappmob.com/api/province/district/' + value.province_id).then((res) => {
                setListQuanHuyen(res.data.results);
            });
        }
    };

    const handleChangeMoTa = (e) => {
        setMoTa(e.target.value);
    };

    const handleCloseModal = () => {
        setOpenModalRap(false);
        setTinhThanhPho(null);
        setQuanHuyen(null);
        setPhuongXa(null);
        setPoster(null);
        setSelectionModelRap([]);
        setSelectedRapRows([]);
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

    const handleLuuRap = () => {
        const formData = new FormData();
        formData.append('file', poster);
        const fetchApiUploadFile = async () => {
            await UploadFileService.uploadFile(formData).then((res) => {
                const newRap = {};
                newRap.tenRap = tenRap;
                newRap.moTa = moTa;
                newRap.hinhAnh = res;
                newRap.trangThai = 'Đang hoạt động';
                newRap.diaChi = {
                    phuongXa: phuongXa.ward_name,
                    quanHuyen: quanHuyen.district_name,
                    tinhThanhPho: tinhThanhPho.province_name,
                };
                const fetchApiThemRap = async () => {
                    await RapService.addRap(newRap).then(() => {
                        const fetchApi = async () => {
                            const res = await RapService.getDsRap();
                            setDsRap(res);
                        };
                        fetchApi();
                        setOpenModalRap(false);
                    });
                };
                fetchApiThemRap();
                setTinhThanhPho('');
                setQuanHuyen('');
                setPhuongXa('');
                setPoster(null);
            });
        };
        fetchApiUploadFile();
    };

    const handleCapNhatRap = () => {
        if (poster.size) {
            const formData = new FormData();
            formData.append('file', poster);

            const fetchApiUploadFile = async () => {
                await UploadFileService.uploadFile(formData).then((res) => {
                    const updateRap = {};
                    updateRap.id = rap[0].id;
                    updateRap.tenRap = tenRap;
                    updateRap.diaChi = {
                        id: rap.diaChi,
                        phuongXa: phuongXa.ward_name,
                        quanHuyen: quanHuyen.district_name,
                        tinhThanhPho: tinhThanhPho.province_name,
                    };
                    updateRap.trangThai = 'Đang hoạt động';
                    updateRap.moTa = moTa;
                    updateRap.hinhAnh = res;

                    const fetchApiUpdateRap = async () => {
                        await RapService.updateRap(updateRap).then(() => {
                            const fetchApiDsRap = async () => {
                                const res = await RapService.getDsRap();
                                setDsRap(res);
                            };
                            fetchApiDsRap();
                            setOpenModalRap(false);
                        });
                    };
                    fetchApiUpdateRap();
                    setPhuongXa('');
                    setQuanHuyen('');
                    setTinhThanhPho('');
                    setPoster(null);
                    setSelectedRapRows([]);
                    setSelectionModelRap([]);
                });
            };
            fetchApiUploadFile();
        } else {
            const updateRap = {};
            updateRap.id = rap[0].id;
            updateRap.tenRap = tenRap;
            updateRap.diaChi = {
                id: rap.diaChi,
                phuongXa: phuongXa.ward_name,
                quanHuyen: quanHuyen.district_name,
                tinhThanhPho: tinhThanhPho.province_name,
            };
            updateRap.moTa = moTa;
            updateRap.hinhAnh = rap[0].hinhAnh;

            const fetchApiUpdateRap = async () => {
                await RapService.updateRap(updateRap).then(() => {
                    const fetchApiDsRap = async () => {
                        const res = await RapService.getDsRap();
                        setDsRap(res);
                    };
                    fetchApiDsRap();
                    setOpenModalRap(false);
                });
            };
            fetchApiUpdateRap();
            setPhuongXa('');
            setQuanHuyen('');
            setTinhThanhPho('');
            setPoster(null);
            setSelectedRapRows([]);
            setSelectionModelRap([]);
        }
    };

    return (
        <Modal
            open={openModalRap}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 'fit-content' }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>{rap.length === 0 ? 'Thông tin rạp' : 'Sửa thông tin rạp'}</div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* Ten Rap */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={tenRap}
                                id="outlined-basic"
                                label="Tên rạp"
                                variant="outlined"
                                onChange={handleChangeTenRap}
                            />
                        </div>
                        {/* Tinh Thanh Pho */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                value={tinhThanhPho ? tinhThanhPho : null}
                                options={listTinhThanhPho}
                                getOptionLabel={(item) => item.province_name}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
                                onChange={handleChangeTinhThanhPho}
                            />
                        </div>
                        {/* Quan Huyen */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl ')}
                                value={quanHuyen ? quanHuyen : null}
                                options={listQuanHuyen}
                                getOptionLabel={(item) => item.district_name}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
                                onChange={handleChangeQuanHuyen}
                            />
                        </div>
                        {/* Phuong Xa */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl ')}
                                value={phuongXa ? phuongXa : null}
                                options={listPhuongXa}
                                getOptionLabel={(item) => item.ward_name}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Phường/Xã" />}
                                onChange={handleChangePhuongXa}
                            />
                        </div>
                        {/* trangThai */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                label="Trạng thái"
                                variant="outlined"
                                disabled
                                defaultValue={'Đang hoạt động'}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* moTa */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                id="outlined-multiline-static"
                                value={moTa}
                                label="Mô tả"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={handleChangeMoTa}
                            />
                        </div>
                        {/* Hinh anh rap */}
                        <div className={cx('text-field')}>
                            {!poster ? (
                                <Button color="success" component="label">
                                    <img
                                        src={nopicture}
                                        alt="no img"
                                        className={cx('object-contain')}
                                        style={{ height: '100px' }}
                                    />
                                    <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                </Button>
                            ) : (
                                renderPreviewIMG()
                            )}
                            <Button variant="outlined" color="success" component="label">
                                Thêm hình ảnh rạp
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
                        onClick={rap.length === 0 ? handleLuuRap : handleCapNhatRap}
                    >
                        {rap.length === 0 ? 'Thêm rạp' : 'Cập nhật'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemRap;
