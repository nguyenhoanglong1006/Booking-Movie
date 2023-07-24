import { Autocomplete, Box, Breadcrumbs, Button, Link, Tab, Tabs, TextField, Typography, styled } from '@mui/material';
import classNames from 'classnames';
import config from '~/config';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useContext, useEffect, useState } from 'react';
import nopicture from '~/assets/no-profile-picture.jpg';
import axios from 'axios';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { CinemaContext } from '~/store/Context';
import UploadFileService from '~/services/uploadFileService';
import KhachHangService from '~/services/khachHangService';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Card from '~/layouts/components/Card';
import ModalChangePassword from '~/components/Modal/ModalChangePassword';
import AuthService from '~/services/authService';

const cx = classNames;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Typography component={'span'}>{children}</Typography>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CssTextField = styled(TextField)({
    color: '#fff',
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
        backgroundColor: '#d4d4d4',
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
        backgroundColor: '#f1f1f1',
    },
});

function ProfileUser() {
    const [value, setValue] = useState(0);
    const [poster, setPoster] = useState(null);
    const [listPhuongXa, setListPhuongXa] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [phuongXa, setPhuongXa] = useState(null);
    const [quanHuyen, setQuanHuyen] = useState(null);
    const [tinhThanhPho, setTinhThanhPho] = useState(null);
    const [hoTen, setHoTen] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [email, setEmail] = useState('');
    const { user, dsphim, setOpenModalChangePassword } = useContext(CinemaContext);
    const [accountUser, setAccountUser] = useState({});

    const navigate = useNavigate();

    // Load Init States
    useEffect(() => {
        if (user) {
            if ({ ...user }.diaChi == null) {
                axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                    setListTinhThanhPho(res.data.results);
                });
                setTinhThanhPho(null);
                setListQuanHuyen([]);
                setQuanHuyen(null);
                setListPhuongXa([]);
                setPhuongXa(null);
                setHoTen(user.ten);
                setNgaySinh(moment(user.ngaySinh).locale('vi', vi).format(' DD/MM/YYYY'));
                setGioiTinh(user.gioiTinh);
                setSoDienThoai(user.dienThoai);
                setEmail(user.email);
                setPoster({ preview: user.avatar });
            } else {
                axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
                    setListTinhThanhPho(res.data.results);
                    const tinhThanhPho = user.diaChi.tinhThanhPho;
                    const tinhThanhPhoObj = res.data.results.filter((t) => t.province_name === tinhThanhPho)[0];
                    setTinhThanhPho(tinhThanhPhoObj);
                    axios
                        .get('https://vapi.vnappmob.com/api/province/district/' + tinhThanhPhoObj.province_id)
                        .then((res) => {
                            setListQuanHuyen(res.data.results);
                            const quanHuyen = user.diaChi.quanHuyen;
                            const quanHuyenObj = res.data.results.filter((t) => t.district_name === quanHuyen)[0];
                            setQuanHuyen(quanHuyenObj);
                            axios
                                .get('https://vapi.vnappmob.com/api/province/ward/' + quanHuyenObj.district_id)
                                .then((res) => {
                                    setListPhuongXa(res.data.results);
                                    const phuongXa = user.diaChi.phuongXa;
                                    const phuongXaObj = res.data.results.filter((t) => t.ward_name === phuongXa)[0];
                                    setPhuongXa(phuongXaObj);
                                });
                        });
                });
                setHoTen(user.ten);
                setNgaySinh(moment(user.ngaySinh).locale('vi', vi).format(' DD/MM/YYYY'));
                setGioiTinh(user.gioiTinh);
                setSoDienThoai(user.dienThoai);
                setEmail(user.email);
                setPoster({ preview: user.avatar });
            }
        }
        const fecthApi = async () => {
            const userAcc = AuthService.getCurrentUser();
            await AuthService.getAccountUserById(userAcc.id).then((res) => {
                setAccountUser(res);
            });
        };
        fecthApi();
    }, [user]);

    const handleChangePhuongXa = (_, value) => {
        setPhuongXa(value);
    };

    const handleChangeQuanHuyen = (_, value) => {
        setPhuongXa(null);
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
        setQuanHuyen(null);
        setPhuongXa(null);

        setTinhThanhPho(value);
        if (value !== null) {
            axios.get('https://vapi.vnappmob.com/api/province/district/' + value.province_id).then((res) => {
                setListQuanHuyen(res.data.results);
            });
        }
    };

    const handleChange = (_, newValue) => {
        setValue(newValue);
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
                    onClick={() => {
                        URL.revokeObjectURL(poster.preview);
                        setPoster(null);
                    }}
                >
                    <img
                        src={poster.preview}
                        alt={poster.name}
                        className={cx('shadow-md object-cover mb-3')}
                        style={{ height: '200px', width: '200px', borderRadius: '100%' }}
                    />
                </Button>
            );
        }
    };

    const handleCapNhatKhachHang = () => {
        if (poster.size) {
            const formData = new FormData();
            formData.append('file', poster);

            const fetchApiUploadFile = async () => {
                await UploadFileService.uploadFile(formData).then((res) => {
                    const updateKhachHang = {};
                    updateKhachHang.id = user.id;
                    updateKhachHang.ten = hoTen;
                    updateKhachHang.ngaySinh = user.ngaySinh;
                    updateKhachHang.gioiTinh = gioiTinh;
                    updateKhachHang.dienThoai = soDienThoai;
                    updateKhachHang.email = email;
                    updateKhachHang.avatar = res;
                    if ({ ...user }.diaChi == null) {
                        updateKhachHang.diaChi = {
                            phuongXa: phuongXa !== null ? phuongXa.ward_name : null,
                            quanHuyen: quanHuyen !== null ? quanHuyen.district_name : null,
                            tinhThanhPho: tinhThanhPho !== null ? tinhThanhPho.province_name : null,
                        };
                    } else {
                        updateKhachHang.diaChi = {
                            id: user.diaChi.id,
                            phuongXa: phuongXa !== null ? phuongXa.ward_name : null,
                            quanHuyen: quanHuyen !== null ? quanHuyen.district_name : null,
                            tinhThanhPho: tinhThanhPho !== null ? tinhThanhPho.province_name : null,
                        };
                    }

                    const fetchApiUpdateKhachHang = async () => {
                        await KhachHangService.updateKhachHang(updateKhachHang).then(() => {
                            alert('Cập nhật thành công');
                            window.location.reload();
                        });
                    };
                    fetchApiUpdateKhachHang();
                });
            };
            fetchApiUploadFile();
        } else {
            const updateKhachHang = {};
            updateKhachHang.id = user.id;
            updateKhachHang.ten = hoTen;
            updateKhachHang.ngaySinh = user.ngaySinh;
            updateKhachHang.gioiTinh = gioiTinh;
            updateKhachHang.dienThoai = soDienThoai;
            updateKhachHang.email = email;
            updateKhachHang.avatar = user.avatar;
            if ({ ...user }.diaChi == null) {
                updateKhachHang.diaChi = {
                    phuongXa: phuongXa !== null ? phuongXa.ward_name : null,
                    quanHuyen: quanHuyen !== null ? quanHuyen.district_name : null,
                    tinhThanhPho: tinhThanhPho !== null ? tinhThanhPho.province_name : null,
                };
            } else {
                updateKhachHang.diaChi = {
                    id: user.diaChi.id,
                    phuongXa: phuongXa !== null ? phuongXa.ward_name : null,
                    quanHuyen: quanHuyen !== null ? quanHuyen.district_name : null,
                    tinhThanhPho: tinhThanhPho !== null ? tinhThanhPho.province_name : null,
                };
            }

            const fetchApiUpdateKhachHang = async () => {
                await KhachHangService.updateKhachHang(updateKhachHang).then(() => {
                    alert('Cập nhật thành công');
                    window.location.reload();
                });
            };
            fetchApiUpdateKhachHang();
        }
    };

    const handleXemThem = () => {
        navigate('/phim');
    };

    const renderListMovie = () => {
        return dsphim.slice(0, 4).map((item, index) => {
            return <Card key={index} data={item} />;
        });
    };

    const hanldeOpenModalChangePassword = () => {
        setOpenModalChangePassword(true);
    };

    return (
        <div className={cx('mx-20 mt-6 row')}>
            {/* breadcrumb */}
            <Box>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon sx={{ fontSize: 20, color: 'gray' }} />}
                    color="#fef7f7"
                >
                    <Link
                        underline="hover"
                        fontSize={15}
                        href={config.routes.trangchu}
                        sx={{ color: 'gray', '&:hover': { color: '#c92522' } }}
                    >
                        Trang chủ
                    </Link>

                    <Typography fontSize={15}>Tài khoản</Typography>
                </Breadcrumbs>
            </Box>

            <div className="w-full mt-4">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#C92522',
                        },
                    }}
                    sx={{
                        '& button': {
                            color: '#fff',
                            fontSize: '20px',
                            fontWeight: '500',
                        },
                        '& button.Mui-selected': { color: '#C92522' },
                    }}
                    className="mb-4"
                >
                    <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
                    <Tab label="Lịch sử đặt vé" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className="flex flex-col">
                        <div className={cx('flex justify-between mt-3 mb-3')}>
                            <div className="w-1/5 flex items-center">
                                {/* Avatar */}
                                <div className={cx('w-full flex flex-col items-center')}>
                                    {!poster ? (
                                        <Button component="label">
                                            <img
                                                src={nopicture}
                                                alt="no img"
                                                className={cx('shadow-md object-cover mb-3')}
                                                style={{ height: '200px', width: '200px', borderRadius: '100%' }}
                                            />
                                            <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                        </Button>
                                    ) : (
                                        renderPreviewIMG()
                                    )}
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        style={{ textTransform: 'none', fontSize: '16px' }}
                                        sx={{
                                            color: '#c92522',
                                            borderColor: '#c92522',
                                            borderWidth: '1px',
                                            '&:hover': {
                                                borderColor: '#c92522',
                                                color: '#c92522',
                                                borderWidth: '1px',
                                            },
                                        }}
                                        className={cx('w-2/3 mb-3')}
                                    >
                                        Thay đổi Avatar
                                        <input type="file" hidden onChange={handlePreviewIMG} accept="image/*" />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        style={{ textTransform: 'none', fontSize: '16px' }}
                                        sx={{
                                            color: '#fff',
                                            borderColor: '#C92522',
                                            borderWidth: '1px',
                                            backgroundColor: '#C92522',
                                            '&:hover': {
                                                borderColor: '#c92522',
                                                borderWidth: '1px',
                                                backgroundColor: '#C92522',
                                            },
                                        }}
                                        className={cx('w-2/3')}
                                        onClick={hanldeOpenModalChangePassword}
                                    >
                                        Đổi mật khẩu
                                    </Button>
                                    <ModalChangePassword acc={accountUser} />
                                </div>
                            </div>
                            <div className="w-2/5 pl-7 pr-7">
                                {/* Ho & Ten */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Họ & Tên</div>
                                    <CssTextField
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={hoTen}
                                    />
                                </div>
                                <div className={cx('flex justify-between mb-4')}>
                                    {/* Ngay sinh */}
                                    <div className={cx('w-7/12 flex flex-col')}>
                                        <div className={cx('mb-3 text-[#ebebeb]')}>Ngày sinh</div>
                                        <CssTextField
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={ngaySinh}
                                        />
                                    </div>
                                    {/* Gioi tinh */}
                                    <div className={cx('w-1/3 flex flex-col')}>
                                        <div className={cx('mb-3 text-[#ebebeb]')}>Giới tính</div>
                                        <CssTextField
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={gioiTinh}
                                        />
                                    </div>
                                </div>
                                {/* So dien thoai */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Số điện thoại</div>
                                    <CssTextField
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={soDienThoai}
                                    />
                                </div>
                                {/* Email */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Email</div>
                                    <CssTextField
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className="w-2/5 pl-10 pr-10">
                                {/* Tinh Thanh Pho */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Tỉnh / Thành phố</div>
                                    <CssAutocomplete
                                        className={cx('text-2xl')}
                                        value={tinhThanhPho ? tinhThanhPho : null}
                                        options={listTinhThanhPho}
                                        getOptionLabel={(item) => item.province_name}
                                        size="small"
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={handleChangeTinhThanhPho}
                                    />
                                </div>
                                {/* Quan Huyen */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Quận / Huyện</div>
                                    <CssAutocomplete
                                        className={cx('text-2xl')}
                                        value={quanHuyen ? quanHuyen : null}
                                        options={listQuanHuyen}
                                        getOptionLabel={(item) => item.district_name}
                                        size="small"
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={handleChangeQuanHuyen}
                                    />
                                </div>
                                {/* Phuong Xa */}
                                <div className={cx('w-full flex flex-col mb-4')}>
                                    <div className={cx('mb-3 text-[#ebebeb]')}>Phường / Xã</div>
                                    <CssAutocomplete
                                        className={cx('text-2xl')}
                                        value={phuongXa ? phuongXa : null}
                                        options={listPhuongXa}
                                        getOptionLabel={(item) => item.ward_name}
                                        size="small"
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={handleChangePhuongXa}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: '#C92522',
                                    fontSize: '16px',
                                }}
                                variant="contained"
                                onClick={handleCapNhatKhachHang}
                            >
                                Lưu lại
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className={cx('text-[white] text-3xl')}>Lịch sử đặt vé</div>
                </TabPanel>
            </div>
            <div className={cx('flex flex-col')}>
                <div
                    className={cx('w-fit text-[#C92522] font-medium pb-1 mb-4')}
                    style={{ borderBottom: '2px solid #c92522', marginTop: '52px' }}
                >
                    Phim đang chiếu
                </div>
                <div>{renderListMovie()}</div>
                <div className={cx('flex justify-end mr-5 my-3')}>
                    <Button
                        className={cx('button-more')}
                        style={{ width: '150px', height: '50px' }}
                        type="button"
                        variant="outlined"
                        onClick={handleXemThem}
                        sx={{
                            color: '#c92522',
                            borderColor: '#c92522',
                            borderWidth: '2px',
                            '&:hover': {
                                borderColor: '#c92522',
                                color: '#c92522',
                                borderWidth: '2px',
                            },
                        }}
                    >
                        Xem thêm <AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '25px' }} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
