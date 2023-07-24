import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemNhanVien.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import { DatePicker } from '@mui/x-date-pickers';
import nopicture from '~/assets/no-picture.png';

import moment from 'moment';
import ChucVuService from '~/services/chucVuService';
import axios from 'axios';
import UploadFileService from '~/services/uploadFileService';
import NhanVienService from '~/services/nhanVienService';
import AuthService from '~/services/authService';

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

function ModalThemNhanVien({ nhanvien }) {
    const {
        openModalNhanVien,
        setOpenModalNhanVien,
        setDsNhanVien,
        setSelectionModelNhanVien,
        setSelectedNhanVienRows,
    } = useContext(CinemaContext);
    const [listChucVu, setListChucVu] = useState([]);
    const [chucVu, setChucVu] = useState(null);
    const [tenNhanVien, setTenNhanVien] = useState('');
    const [email, setEmail] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [gioiTinh, setGioiTinh] = useState(null);
    const [listPhuongXa, setListPhuongXa] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [phuongXa, setPhuongXa] = useState(null);
    const [quanHuyen, setQuanHuyen] = useState(null);
    const [tinhThanhPho, setTinhThanhPho] = useState(null);
    const [ngaySinh, setNgaySinh] = useState(null);
    const [poster, setPoster] = useState(null);

    // Load ds chuc vu
    useEffect(() => {
        const fetchApiChucVu = async () => {
            const res = await ChucVuService.getDsChucVu();
            setListChucVu(res);
        };
        fetchApiChucVu();
    }, []);

    // Load Init States
    useEffect(() => {
        if (nhanvien.length === 0) {
            axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                setListTinhThanhPho(res.data.results);
            });
            setTinhThanhPho(null);
            setListQuanHuyen([]);
            setQuanHuyen(null);
            setListPhuongXa([]);
            setPhuongXa(null);
            setTenNhanVien('');
            setGioiTinh(null);
            setChucVu(null);
            setNgaySinh(null);
            setPoster(null);
            setEmail('');
            setSoDienThoai('');
        } else {
            axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                setListTinhThanhPho(res.data.results);
                const tinhThanhPho = nhanvien[0].diaChi.tinhThanhPho;
                const tinhThanhPhoObj = res.data.results.filter((t) => t.province_name === tinhThanhPho)[0];
                setTinhThanhPho(tinhThanhPhoObj);
                axios
                    .get('https://vapi.vnappmob.com/api/province/district/' + tinhThanhPhoObj.province_id)
                    .then((res) => {
                        setListQuanHuyen(res.data.results);
                        const quanHuyen = nhanvien[0].diaChi.quanHuyen;
                        const quanHuyenObj = res.data.results.filter((t) => t.district_name === quanHuyen)[0];
                        setQuanHuyen(quanHuyenObj);
                        axios
                            .get('https://vapi.vnappmob.com/api/province/ward/' + quanHuyenObj.district_id)
                            .then((res) => {
                                setListPhuongXa(res.data.results);
                                const phuongXa = nhanvien[0].diaChi.phuongXa;
                                const phuongXaObj = res.data.results.filter((t) => t.ward_name === phuongXa)[0];
                                setPhuongXa(phuongXaObj);
                            });
                    });
            });
            setTenNhanVien(nhanvien[0].ten);
            setGioiTinh(nhanvien[0].gioiTinh);
            setChucVu(nhanvien[0].chucVu);
            setNgaySinh(moment(nhanvien[0].ngaySinh));
            setPoster({ preview: nhanvien[0].avatar });
            setEmail(nhanvien[0].email);
            setSoDienThoai(nhanvien[0].dienThoai);
        }
    }, [nhanvien]);

    const handleChangeTenNhanVien = (e) => {
        setTenNhanVien(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeSoDienThoai = (e) => {
        setSoDienThoai(e.target.value);
    };

    const handleChangeGioiTinh = (_, value) => {
        setGioiTinh(value);
    };

    const handleChangeChucVu = (_, value) => {
        setChucVu(value);
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

    const handleCloseModal = () => {
        setOpenModalNhanVien(false);
        setNgaySinh(null);
        setPoster(null);
        setSelectedNhanVienRows([]);
        setSelectionModelNhanVien([]);
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
                        style={{ height: '120px' }}
                    />
                </Button>
            );
        }
    };

    const handleThemNhanVien = () => {
        const formData = new FormData();
        formData.append('file', poster);

        AuthService.register(email, email, '123456', ['emp'])
            .then((res) => {
                alert(res.data.message);
                const fetchApiUploadFile = async () => {
                    await UploadFileService.uploadFile(formData).then((res) => {
                        const newNhanVien = {};
                        newNhanVien.ten = tenNhanVien;
                        newNhanVien.ngaySinh = moment(ngaySinh).format('YYYY-MM-DD');
                        newNhanVien.gioiTinh = gioiTinh;
                        newNhanVien.dienThoai = soDienThoai;
                        newNhanVien.email = email;
                        newNhanVien.avatar = res;
                        newNhanVien.trangThai = 'Đang làm việc';
                        newNhanVien.chucVu = chucVu;
                        newNhanVien.diaChi = {
                            phuongXa: phuongXa.ward_name,
                            quanHuyen: quanHuyen.district_name,
                            tinhThanhPho: tinhThanhPho.province_name,
                        };
                        const fetchApiThemNhanVien = async () => {
                            await NhanVienService.addNhanVien(newNhanVien).then((res) => {
                                const fetchApi = async () => {
                                    const res = await NhanVienService.getDsNhanVien();
                                    setDsNhanVien(res);
                                };
                                fetchApi();
                                setOpenModalNhanVien(false);
                            });
                        };
                        fetchApiThemNhanVien();
                        setTinhThanhPho(null);
                        setQuanHuyen(null);
                        setPhuongXa(null);
                        setPoster(null);
                        setSelectedNhanVienRows([]);
                        setSelectionModelNhanVien([]);
                    });
                };
                fetchApiUploadFile();
            })
            .catch(() => {
                alert('Email đã được đăng ký!');
                setEmail('');
            });
    };

    const handleCapNhatNhanVien = () => {
        if (poster.size) {
            const formData = new FormData();
            formData.append('file', poster);

            const fetchApiUploadFile = async () => {
                await UploadFileService.uploadFile(formData).then((res) => {
                    const newNhanVien = {};
                    newNhanVien.id = nhanvien[0].id;
                    newNhanVien.ten = tenNhanVien;
                    newNhanVien.ngaySinh = moment(ngaySinh).format('YYYY-MM-DD');
                    newNhanVien.gioiTinh = gioiTinh;
                    newNhanVien.dienThoai = soDienThoai;
                    newNhanVien.email = email;
                    newNhanVien.avatar = res;
                    newNhanVien.trangThai = 'Đang làm việc';
                    newNhanVien.chucVu = chucVu;
                    newNhanVien.diaChi = {
                        id: nhanvien[0].diaChi.id,
                        phuongXa: phuongXa.ward_name,
                        quanHuyen: quanHuyen.district_name,
                        tinhThanhPho: tinhThanhPho.province_name,
                    };
                    const fetchApiUpdateNhanVien = async () => {
                        await NhanVienService.updateNhanVien(newNhanVien).then(() => {
                            const fetchApi = async () => {
                                const res = await NhanVienService.getDsNhanVien();
                                setDsNhanVien(res);
                            };
                            fetchApi();
                            setOpenModalNhanVien(false);
                        });
                    };
                    fetchApiUpdateNhanVien();
                    setTinhThanhPho(null);
                    setQuanHuyen(null);
                    setPhuongXa(null);
                    setPoster(null);
                    setSelectedNhanVienRows([]);
                    setSelectionModelNhanVien([]);
                });
            };
            fetchApiUploadFile();
        } else {
            const newNhanVien = {};
            newNhanVien.id = nhanvien[0].id;
            newNhanVien.ten = tenNhanVien;
            newNhanVien.ngaySinh = moment(ngaySinh).format('YYYY-MM-DD');
            newNhanVien.gioiTinh = gioiTinh;
            newNhanVien.dienThoai = soDienThoai;
            newNhanVien.email = email;
            newNhanVien.avatar = nhanvien[0].avatar;
            newNhanVien.trangThai = 'Đang làm việc';
            newNhanVien.chucVu = chucVu;
            newNhanVien.diaChi = {
                id: nhanvien[0].diaChi.id,
                phuongXa: phuongXa.ward_name,
                quanHuyen: quanHuyen.district_name,
                tinhThanhPho: tinhThanhPho.province_name,
            };
            const fetchApiUpdateNhanVien = async () => {
                await NhanVienService.updateNhanVien(newNhanVien).then(() => {
                    const fetchApi = async () => {
                        const res = await NhanVienService.getDsNhanVien();
                        setDsNhanVien(res);
                    };
                    fetchApi();
                    setOpenModalNhanVien(false);
                });
            };
            fetchApiUpdateNhanVien();
            setTinhThanhPho(null);
            setQuanHuyen(null);
            setPhuongXa(null);
            setPoster(null);
            setSelectedNhanVienRows([]);
            setSelectionModelNhanVien([]);
        }
    };

    return (
        <Modal
            open={openModalNhanVien}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: '50%', height: 'fit' }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>
                    {nhanvien.length === 0 ? 'Thông tin nhân viên' : 'Sửa thông tin nhân viên'}
                </div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* Ten Nhan Vien */}
                        <div className={cx('text-field')}>
                            <TextField
                                value={tenNhanVien}
                                size="small"
                                id="outlined-basic"
                                label="Tên nhân viên"
                                variant="outlined"
                                onChange={handleChangeTenNhanVien}
                            />
                        </div>
                        {/* Gioi tinh */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                value={gioiTinh}
                                options={['Nam', 'Nữ', 'Khác'].map((item) => item)}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Giới tính" />}
                                onChange={handleChangeGioiTinh}
                            />
                        </div>
                        {/* Ngay Sinh */}
                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày sinh"
                                value={ngaySinh}
                                onChange={(newValue) => setNgaySinh(newValue)}
                                renderInput={(params) => <TextField size="small" {...params} />}
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
                        {/* Chuc vu */}
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                value={chucVu ? chucVu : null}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={listChucVu}
                                getOptionLabel={(item) => item.tenChucVu}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Chức vụ" />}
                                onChange={handleChangeChucVu}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* Poster */}
                        <div className={cx('text-field')}>
                            {!poster ? (
                                <Button color="success" component="label">
                                    <img
                                        src={nopicture}
                                        alt="no img"
                                        className={cx('object-contain')}
                                        style={{ height: '110px' }}
                                    />
                                    <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                </Button>
                            ) : (
                                renderPreviewIMG()
                            )}
                            <Button variant="outlined" color="success" component="label">
                                Thêm Avatar
                                <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                            </Button>
                        </div>
                        {/* Email */}
                        <div className={cx('text-field')}>
                            {nhanvien.length === 0 ? (
                                <TextField
                                    value={email}
                                    size="small"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleChangeEmail}
                                />
                            ) : (
                                <TextField
                                    disabled
                                    value={email}
                                    size="small"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleChangeEmail}
                                />
                            )}
                        </div>
                        {/* So dien thoai */}
                        <div className={cx('text-field')}>
                            <TextField
                                value={soDienThoai}
                                size="small"
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                                onChange={handleChangeSoDienThoai}
                            />
                        </div>
                        {/* Trang Thai */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                label="Đang làm việc"
                                variant="outlined"
                                disabled
                                defaultValue={'Bình thường'}
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
                    {/* Button Them Nhan Vien and Cap Nhat Nhan Vien */}
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
                        onClick={nhanvien.length === 0 ? handleThemNhanVien : handleCapNhatNhanVien}
                    >
                        {nhanvien.length === 0 ? 'Thêm nhân viên' : 'Cập nhật'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemNhanVien;
