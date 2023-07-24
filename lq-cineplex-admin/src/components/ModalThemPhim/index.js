import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    useTheme,
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemPhim.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from '@mui/x-date-pickers';
import nopicture from '~/assets/no-picture.png';
import TheLoaiService from '~/services/theLoaiService';
import DaoDienService from '~/services/daoDienService';
import DienVienService from '~/services/dienVienService';
import PhimService from '~/services/phimService';
import moment from 'moment';
import 'moment-timezone';
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const dsQuocGia = ['Việt Nam', 'Mỹ', 'Hàn Quốc', 'Nhật Bản', 'Đài Loan', 'Trung Quốc', 'Canada'];

function getStyles(theloai, tenTheLoai, theme) {
    return {
        fontWeight:
            tenTheLoai.indexOf(theloai) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

function ModalThemPhim({ phim }) {
    const [dsTheLoai, setDsTheLoai] = useState([]);
    const [dsDaoDien, setDsDaoDien] = useState([]);
    const [dsDienVien, setDsDienVien] = useState([]);

    const theme = useTheme();
    const { openModalPhim, setOpenModalPhim, setdsphim, setSelectedPhimRows, setSelectionModelPhim } =
        useContext(CinemaContext);

    const [tenPhim, setTenPhim] = useState('');
    const [trailer, setTrailer] = useState('');
    const [thoiLuong, setThoiLuong] = useState('');
    const [quocGia, setQuocGia] = useState('');
    const [dsDaoDienDaChon, setDsDaoDienDaChon] = useState([]);
    const [dsDienVienDaChon, setDsDienVienDaChon] = useState([]);
    const [ngayKhoiChieu, setngayKhoiChieu] = useState(null);
    const [moTa, setMoTa] = useState('');
    const [poster, setPoster] = useState(null);
    const [dsTheLoaiDaChon, setDsTheLoaiDaChon] = useState([]);

    // Init state
    useEffect(() => {
        setTenPhim(phim.length !== 0 ? phim[0].tenPhim : '');
        setTrailer(phim.length !== 0 ? phim[0].trailer : '');
        setThoiLuong(phim.length !== 0 ? phim[0].thoiLuong : '');
        setQuocGia(phim.length !== 0 ? phim[0].quocGia : '');
        setPoster(phim.length !== 0 ? { preview: phim[0].poster } : null);
        setMoTa(phim.length !== 0 ? phim[0].moTa : '');
        setDsDaoDienDaChon(phim.length !== 0 ? phim[0].dsDaoDien : []);
        setDsDienVienDaChon(phim.length !== 0 ? phim[0].dsDienVien : []);
        setDsTheLoaiDaChon(phim.length !== 0 ? phim[0].dsTheLoai : []);
        setngayKhoiChieu(phim.length !== 0 ? moment(phim[0].ngayKhoiChieu) : null);
    }, [phim]);

    // Load Ds The Loai
    useEffect(() => {
        const fetchTheLoai = async () => {
            const res = await TheLoaiService.getDsTheLoai();
            setDsTheLoai(res);
        };
        fetchTheLoai();
    }, []);

    // Load Ds Dao Dien
    useEffect(() => {
        const fetchDaoDien = async () => {
            const res = await DaoDienService.getDsDaoDien();
            setDsDaoDien(res);
        };
        fetchDaoDien();
    }, []);

    // Load Ds Dien Vien
    useEffect(() => {
        const fetchDienVien = async () => {
            const res = await DienVienService.getDsDienVien();
            setDsDienVien(res);
        };
        fetchDienVien();
    }, []);

    const handleChangeTenPhim = (e) => {
        setTenPhim(e.target.value);
    };

    const handleChangeTrailer = (e) => {
        setTrailer(e.target.value);
    };

    const handleChangeThoiLuong = (e) => {
        const thoiLuong = parseInt(e.target.value);
        setThoiLuong(thoiLuong);
    };

    const handleChangeMoTa = (e) => {
        setMoTa(e.target.value);
    };

    const handleCloseModal = () => {
        setOpenModalPhim(false);
        setQuocGia('');
        setDsDaoDienDaChon([]);
        setDsDienVienDaChon([]);
        setngayKhoiChieu(null);
        setPoster(null);
        setDsTheLoaiDaChon([]);
        setSelectionModelPhim([]);
        setSelectedPhimRows([]);
    };

    const handleChangeTheLoai = (event) => {
        const {
            target: { value },
        } = event;
        setDsTheLoaiDaChon(value);
    };

    const handleChangeDaoDien = (event) => {
        const {
            target: { value },
        } = event;
        setDsDaoDienDaChon(value);
    };

    const handleChangeDienVien = (event) => {
        const {
            target: { value },
        } = event;
        setDsDienVienDaChon(value);
    };

    const handleDeleteTheLoai = (e, value) => {
        e.preventDefault();
        setDsTheLoaiDaChon(dsTheLoaiDaChon.filter((theloai) => theloai !== value));
    };

    const handleDeleteDaoDien = (e, value) => {
        e.preventDefault();
        setDsDaoDienDaChon(dsDaoDienDaChon.filter((daodien) => daodien !== value));
    };

    const handleDeleteDienVien = (e, value) => {
        e.preventDefault();
        setDsDienVienDaChon(dsDienVienDaChon.filter((dienvien) => dienvien !== value));
    };

    const handleChangeQuocGia = (event) => {
        setQuocGia(event.target.value);
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

    const handleLuuPhim = () => {
        const formData = new FormData();
        formData.append('file', poster);

        const fetchApiUploadFile = async () => {
            await UploadFileService.uploadFile(formData).then((res) => {
                const newPhim = {};
                newPhim.tenPhim = tenPhim;
                newPhim.thoiLuong = thoiLuong;
                newPhim.moTa = moTa;
                newPhim.quocGia = quocGia;
                newPhim.trailer = trailer;
                newPhim.ngayKhoiChieu = moment(ngayKhoiChieu).format('YYYY-MM-DD');
                newPhim.trangThai = 'Sắp chiếu';
                newPhim.dsTheLoai = dsTheLoaiDaChon;
                newPhim.dsDaoDien = dsDaoDienDaChon;
                newPhim.dsDienVien = dsDienVienDaChon;
                newPhim.poster = res;

                const fetchApiThemPhim = async () => {
                    await PhimService.addPhim(newPhim).then(() => {
                        const fetchApiDsPhim = async () => {
                            const res = await PhimService.getDsPhim();
                            setdsphim(res);
                        };
                        fetchApiDsPhim();
                        setOpenModalPhim(false);
                    });
                };
                fetchApiThemPhim();
                setQuocGia('');
                setDsDaoDienDaChon([]);
                setDsDienVienDaChon([]);
                setngayKhoiChieu(null);
                setPoster(null);
                setDsTheLoaiDaChon([]);
            });
        };
        fetchApiUploadFile();
    };

    const handleCapNhatPhim = () => {
        if (poster.size) {
            const formData = new FormData();
            formData.append('file', poster);

            const fetchApiUploadFile = async () => {
                await UploadFileService.uploadFile(formData).then((res) => {
                    const updatePhim = {};
                    updatePhim.id = phim[0].id;
                    updatePhim.tenPhim = tenPhim;
                    updatePhim.thoiLuong = thoiLuong;
                    updatePhim.moTa = moTa;
                    updatePhim.quocGia = quocGia;
                    updatePhim.trailer = trailer;
                    updatePhim.ngayKhoiChieu = moment(ngayKhoiChieu).format('YYYY-MM-DD');
                    updatePhim.trangThai = 'Sắp chiếu';
                    updatePhim.dsTheLoai = dsTheLoaiDaChon;
                    updatePhim.dsDaoDien = dsDaoDienDaChon;
                    updatePhim.dsDienVien = dsDienVienDaChon;
                    updatePhim.poster = res;

                    const fetchApiUpdatePhim = async () => {
                        await PhimService.updatePhim(updatePhim).then(() => {
                            const fetchApiDsPhim = async () => {
                                const res = await PhimService.getDsPhim();
                                setdsphim(res);
                            };
                            fetchApiDsPhim();
                            setOpenModalPhim(false);
                        });
                    };
                    fetchApiUpdatePhim();
                    setQuocGia('');
                    setDsDaoDienDaChon([]);
                    setDsDienVienDaChon([]);
                    setngayKhoiChieu(null);
                    setPoster(null);
                    setDsTheLoaiDaChon([]);
                    setSelectedPhimRows([]);
                    setSelectionModelPhim([]);
                });
            };
            fetchApiUploadFile();
        } else {
            const updatePhim = {};
            updatePhim.id = phim[0].id;
            updatePhim.tenPhim = tenPhim;
            updatePhim.thoiLuong = thoiLuong;
            updatePhim.moTa = moTa;
            updatePhim.quocGia = quocGia;
            updatePhim.trailer = trailer;
            updatePhim.ngayKhoiChieu = moment(ngayKhoiChieu).format('YYYY-MM-DD');
            updatePhim.trangThai = 'Sắp chiếu';
            updatePhim.dsTheLoai = dsTheLoaiDaChon;
            updatePhim.dsDaoDien = dsDaoDienDaChon;
            updatePhim.dsDienVien = dsDienVienDaChon;
            updatePhim.poster = phim[0].poster;

            const fetchApiUpdatePhim = async () => {
                await PhimService.updatePhim(updatePhim).then(() => {
                    const fetchApiDsPhim = async () => {
                        const res = await PhimService.getDsPhim();
                        setdsphim(res);
                    };
                    fetchApiDsPhim();
                    setOpenModalPhim(false);
                });
            };
            fetchApiUpdatePhim();
            setQuocGia('');
            setDsDaoDienDaChon([]);
            setDsDienVienDaChon([]);
            setngayKhoiChieu(null);
            setPoster(null);
            setDsTheLoaiDaChon([]);
            setSelectedPhimRows([]);
            setSelectionModelPhim([]);
        }
    };

    return (
        <Modal
            open={openModalPhim}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 'fit-content' }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>{phim.length === 0 ? 'Thông tin phim' : 'Sửa thông tin phim'}</div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        {/* Ten Phim */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={tenPhim}
                                id="outlined-basic"
                                label="Tên phim"
                                variant="outlined"
                                onChange={handleChangeTenPhim}
                            />
                        </div>
                        {/* Trailer */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={trailer}
                                id="outlined-basic"
                                label="Trailer"
                                variant="outlined"
                                onChange={handleChangeTrailer}
                            />
                        </div>
                        {/* Thoi Luong */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                value={thoiLuong}
                                id="outlined-basic"
                                label="Thời lượng"
                                variant="outlined"
                                onChange={handleChangeThoiLuong}
                            />
                        </div>
                        {/* Quoc Gia */}
                        <div className={cx('text-field')}>
                            <FormControl size="small">
                                <InputLabel id="demo-select-small">Quốc gia</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={quocGia}
                                    label="Quốc gia"
                                    onChange={handleChangeQuocGia}
                                >
                                    <MenuItem value=""></MenuItem>
                                    {dsQuocGia.map((quocGia, index) => {
                                        return (
                                            <MenuItem key={index} value={quocGia}>
                                                {quocGia}
                                            </MenuItem>
                                        );
                                    })}
                                    ;
                                </Select>
                            </FormControl>
                        </div>
                        {/* Dao Dien */}
                        <div className={cx('text-field')}>
                            <FormControl size="small">
                                <InputLabel id="demo-multiple-chip-label">Đạo diễn</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={dsDaoDienDaChon}
                                    onChange={handleChangeDaoDien}
                                    input={<OutlinedInput id="select-multiple-chip" label="Đạo diễn" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value.id}
                                                    label={value.tenDaoDien}
                                                    clickable
                                                    deleteIcon={
                                                        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                                    }
                                                    onDelete={(e) => handleDeleteDaoDien(e, value)}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {dsDaoDien.map((daodien) => (
                                        <MenuItem
                                            key={daodien.id}
                                            value={daodien}
                                            style={getStyles(daodien, dsDaoDienDaChon, theme)}
                                        >
                                            {daodien.tenDaoDien}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Dien Vien */}
                        <div className={cx('text-field')}>
                            <FormControl size="small">
                                <InputLabel id="demo-multiple-chip-label">Diễn viên</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={dsDienVienDaChon}
                                    onChange={handleChangeDienVien}
                                    input={<OutlinedInput id="select-multiple-chip" label="Diễn viên" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value.id}
                                                    label={value.tenDienVien}
                                                    clickable
                                                    deleteIcon={
                                                        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                                    }
                                                    onDelete={(e) => handleDeleteDienVien(e, value)}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {dsDienVien.map((dienvien) => (
                                        <MenuItem
                                            key={dienvien.id}
                                            value={dienvien}
                                            style={getStyles(dienvien, dsDienVienDaChon, theme)}
                                        >
                                            {dienvien.tenDienVien}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Ngay Khoi Chieu */}
                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày khởi chiếu"
                                value={ngayKhoiChieu}
                                onChange={(newValue) => setngayKhoiChieu(newValue)}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        {/* Mo Ta */}
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
                        {/* Poster */}
                        <div className={cx('text-field')}>
                            {!poster ? (
                                <Button color="success" component="label">
                                    <img
                                        src={nopicture}
                                        alt="no img"
                                        className={cx('object-contain')}
                                        style={{ height: '103px' }}
                                    />
                                    <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                </Button>
                            ) : (
                                renderPreviewIMG()
                            )}
                            <Button variant="outlined" color="success" component="label">
                                Thêm Poster Phim
                                <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                            </Button>
                        </div>
                        {/* The Loai */}
                        <div className={cx('text-field')}>
                            <FormControl size="small">
                                <InputLabel id="demo-multiple-chip-label">Thể loại</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={dsTheLoaiDaChon}
                                    onChange={handleChangeTheLoai}
                                    input={<OutlinedInput id="select-multiple-chip" label="Thể loại" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value.id}
                                                    label={value.tenTheLoai}
                                                    clickable
                                                    deleteIcon={
                                                        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                                    }
                                                    onDelete={(e) => handleDeleteTheLoai(e, value)}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {dsTheLoai.map((theloai) => (
                                        <MenuItem
                                            key={theloai.id}
                                            value={theloai}
                                            style={getStyles(theloai, dsTheLoaiDaChon, theme)}
                                        >
                                            {theloai.tenTheLoai}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Trang Thai */}
                        <div className={cx('text-field')}>
                            <TextField
                                size="small"
                                label="Trạng thái"
                                variant="outlined"
                                disabled
                                defaultValue={'Sắp chiếu'}
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
                    {/* Button Luu Phim or Cap nhat*/}
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
                        onClick={phim.length === 0 ? handleLuuPhim : handleCapNhatPhim}
                    >
                        {phim.length === 0 ? 'Thêm phim' : 'Cập nhật'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemPhim;
