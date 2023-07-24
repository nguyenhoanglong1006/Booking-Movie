import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemKhachHang.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import nopicture from '~/assets/no-picture.png';
import UploadFileService from '~/services/uploadFileService';
import moment from 'moment';
import 'moment-timezone';
import KhachHangService from '~/services/khachHangService';
import { DatePicker } from '@mui/x-date-pickers';
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

function ModalThemKhachHang() {
    const { openModalKhachHang, setOpenModalKhachHang } = useContext(CinemaContext);

    const [ten, setTen] = useState('');
    const [ngaySinh, setNgaySinh] = useState(null);
    const [gioiTinh, setGioiTinh] = useState('');
    const [dienThoai, setDienThoai] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [listPhuongXa, setListPhuongXa] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [phuongXa, setPhuongXa] = useState('');
    const [quanHuyen, setQuanHuyen] = useState(null);
    const [tinhThanhPho, setTinhThanhPho] = useState('');

    // Load ds tinh thanh pho
    useEffect(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
            setListTinhThanhPho(res.data.results);
        });
    }, []);
    const handleCloseModal = () => {
        setOpenModalKhachHang(false);
    };

    const handleChangeTen = (e) => {
        setTen(e.target.value);
    };

    const handleChangeGioiTinh = (_, value) => {
        setGioiTinh(value);
    };
    const handleChangePhuongXa = (_, value) => {
        setPhuongXa(value);
    };

    const handleChangeQuanHuyen = (_, value) => {
        setQuanHuyen(value);
        if (value !== null) {
            axios.get('https://vapi.vnappmob.com/api/province/ward/' + value.district_id).then((res) => {
                setListPhuongXa(res.data.results);
            });
        }
    };

    const handleChangeTinhThanhPho = (_, value) => {
        setTinhThanhPho(value);
        if (value !== null) {
            axios.get('https://vapi.vnappmob.com/api/province/district/' + value.province_id).then((res) => {
                setListQuanHuyen(res.data.results);
            });
        }
    };

    const handleChangeDienThoai = (e) => {
        setDienThoai(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    var handlePreviewIMG = (e) => {
        if (!!avatar) URL.revokeObjectURL(avatar?.preview);
        const selectedFiles = e.target.files;
        const SIZE_FILE = 62914560; // = 60MB
        var img = selectedFiles[0];
        if (img.size > SIZE_FILE) {
            alert('Dung lượng mỗi ảnh  tối đa là 60MB');
            return;
        }
        img.preview = URL.createObjectURL(img);
        e.target.value = null;
        setAvatar(img);
    };

    const renderPreviewIMG = () => {
        if (!!avatar) {
            return (
                <Button
                    type="button"
                    className={cx('absolute -top-1 -right-1 m-0 p-0 ')}
                    onClick={() => {
                        URL.revokeObjectURL(avatar.preview);
                        setAvatar(null);
                    }}
                >
                    <img
                        src={avatar.preview}
                        alt={avatar.name}
                        className={cx('shadow-md object-contain')}
                        style={{ height: '115px' }}
                    />
                </Button>
            );
        }
    };

    const handleLuuKhachHang = () => {
        const formData = new FormData();
        formData.append('file', avatar);
        const fetchApiUploadFile = async () => {
            await UploadFileService.uploadFile(formData).then((res) => {
                const newKhachHang = {};
                newKhachHang.ten = ten;
                newKhachHang.ngaySinh = moment(ngaySinh).tz('Asia/Ho_Chi_Minh').toDate();
                newKhachHang.gioiTinh = gioiTinh;
                newKhachHang.dienThoai = dienThoai;
                newKhachHang.email = email;
                newKhachHang.diaChi = {
                    phuongXa: phuongXa.ward_name,
                    quanHuyen: quanHuyen.district_name,
                    tinhThanhPho: tinhThanhPho.province_name,
                };
                newKhachHang.avatar = res;
                const fetchApiThemKhachHang = async () => {
                    await KhachHangService.addKhachHang(newKhachHang).then((res) => {
                        setOpenModalKhachHang(false);
                    });
                };
                fetchApiThemKhachHang();
            });
        };
        fetchApiUploadFile();
    };

    return (
        <Modal
            open={openModalKhachHang}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 470 }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>Thông tin Khách Hàng</div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* ten khach hang */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Tên khách hàng"
                                variant="outlined"
                                onChange={handleChangeTen}
                            />
                        </div>
                        {/* ngay sinh  */}
                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày sinh"
                                value={ngaySinh}
                                onChange={(newValue) => setNgaySinh(newValue)}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>
                        {/* Gioi tinh */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                options={['Nam', 'Nữ', 'Khác'].map((item) => item)}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Giới tính" />}
                                onChange={handleChangeGioiTinh}
                            />
                        </div>
                        {/* avatar */}
                        <div className={cx('text-field')}>
                            {!avatar ? (
                                <Button color="success" component="label">
                                    <img
                                        src={nopicture}
                                        alt="no img"
                                        className={cx('object-contain')}
                                        style={{ height: '70px' }}
                                    />
                                    <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                </Button>
                            ) : (
                                renderPreviewIMG()
                            )}
                            <Button variant="outlined" color="success" component="label">
                                Thêm avatar
                                <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                            </Button>
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* email */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={handleChangeEmail}
                            />
                        </div>
                        {/* dien thoai */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                                onChange={handleChangeDienThoai}
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
                                onInputChange={() => {
                                    setListQuanHuyen([]);
                                    setQuanHuyen('');
                                }}
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
                                onInputChange={() => {
                                    setListPhuongXa([]);
                                    setPhuongXa('');
                                }}
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
                    </Box>
                </div>
                <div className={cx('group-button')}>
                    {/* Button huy */}
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
                    {/* Button them khach hang */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '8px',

                            '&:hover': {
                                backgroundColor: '#1aff1a',
                                color: 'white',
                            },
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleLuuKhachHang}
                    >
                        Thêm khách hàng
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemKhachHang;
