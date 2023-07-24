import { Autocomplete, Box, Breadcrumbs, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';
import classNames from 'classnames';
import config from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';
import vi from 'moment/locale/vi';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RapService from '~/services/rapService';
import { DatePicker } from '@mui/x-date-pickers';
import { CinemaContext } from '~/store/Context';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ShowtimeCard from '~/components/ShowtimeCard';
import CardMovieRight from '~/layouts/components/CardMovieRight';

const cx = classNames;

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fefcfb',
    boxShadow: 24,
    borderRadius: 2,
};

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
        backgroundColor: '#ebebeb',
    },
});

const CssDatePicker = styled(DatePicker)({
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
        backgroundColor: '#ebebeb',
    },
});

function DetailMovie() {
    const location = useLocation();
    const phim = location.state;
    const [isOpen, setOpen] = useState(false);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const { dsphim, dsRap, setDsRap } = useContext(CinemaContext);
    const [selectedRap, setSelectedRap] = useState('');
    const [valueRap, setValueRap] = useState(null);
    const [ngayChieu, setNgayChieu] = useState(moment(new Date()));

    const navigate = useNavigate();

    const handleOpenTrailer = () => {
        setOpen(true);
    };

    const handleCloseTrailer = () => {
        setOpen(false);
    };

    const handleXemThem = () => {
        navigate('/phim');
    };

    const renderListMovie = () => {
        return dsphim.slice(0, 4).map((item, index) => {
            return <CardMovieRight key={index} data={item} />;
        });
    };

    useEffect(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
            setListTinhThanhPho(res.data.results);
        });
    }, []);

    useEffect(() => {
        setValueRap(dsRap);
    }, [dsRap]);

    const handleChangeTinhThanhPho = (_, value) => {
        const fetchApi = async () => {
            const res = await RapService.getDsRapByTinhThanhPho(value);
            setDsRap(res);
        };
        fetchApi();
    };

    const handleChangeRap = (_, value) => {
        setSelectedRap(value);
        if (value !== null) {
            setValueRap([value]);
        } else {
            setValueRap(dsRap);
        }
    };

    const theLoai = phim.dsTheLoai.map((theLoai) => {
        const dsTenTheLoai = [];
        const tenTheLoai = theLoai.tenTheLoai;
        dsTenTheLoai.push(tenTheLoai);
        return dsTenTheLoai;
    });
    const daoDien = phim.dsDaoDien.map((daoDien) => {
        const dsTenDaoDien = [];
        const tenDaoDien = daoDien.tenDaoDien;
        dsTenDaoDien.push(tenDaoDien);
        return dsTenDaoDien;
    });
    const dienVien = phim.dsDienVien.map((dienVien) => {
        const dsTenDienVien = [];
        const tenDienVien = dienVien.tenDienVien;
        dsTenDienVien.push(tenDienVien);
        return dsTenDienVien;
    });
    const ngayKhoiChieu = moment(new Date(phim.ngayKhoiChieu)).locale('vi', vi).format('DD/MM/YYYY');

    return (
        <div className={cx('mx-20 mt-6 row')}>
            {/* Left */}
            <div className={cx('flex flex-col col-8')}>
                {/* breadcrumb */}
                <div className={cx('')}>
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

                            <Link
                                href={config.routes.phim}
                                underline="hover"
                                fontSize={15}
                                sx={{ color: 'gray', '&:hover': { color: '#c92522' } }}
                            >
                                Phim đang chiếu
                            </Link>
                            <Typography fontSize={15}>{phim.tenPhim}</Typography>
                        </Breadcrumbs>
                    </Box>
                </div>

                <div className={cx('mt-8')}>
                    {/* Movie Info */}
                    <div className={cx('flex flex-row')}>
                        <img src={phim.poster} alt="poster-movie" style={{ height: '370px', objectFit: 'cover' }} />
                        <div className={cx('flex flex-col ml-14 text-white')}>
                            <div className={cx('text-[#c92522] font-medium text-3xl')}>{phim.tenPhim}</div>
                            <div className={cx('flex flex-row items-center my-3')} style={{ fontSize: '20px' }}>
                                <AccessTimeIcon sx={{ fontSize: '20px', marginRight: '10px' }} />
                                Thời lượng: {phim.thoiLuong} phút
                            </div>
                            <div className={cx('mb-2')} style={{ fontSize: '18px' }}>
                                Quốc gia: {phim.quocGia}{' '}
                            </div>
                            <div className={cx('mb-2')} style={{ fontSize: '18px' }}>
                                Diễn viên: {dienVien.join(', ')}
                            </div>
                            <div className={cx('mb-2')} style={{ fontSize: '18px' }}>
                                Thể loại: {theLoai.join(', ')}
                            </div>
                            <div className={cx('mb-2')} style={{ fontSize: '18px' }}>
                                Đạo diễn: {daoDien.join(', ')}
                            </div>
                            <div className={cx('mb-2')} style={{ fontSize: '18px' }}>
                                Ngày khởi chiếu: {ngayKhoiChieu}
                            </div>
                            {/* Button open trailer */}
                            <div className={cx('my-3')}>
                                <Button
                                    className={cx('px-5 py-2')}
                                    style={{
                                        backgroundColor: '#C92522',
                                        fontSize: '18px',
                                    }}
                                    variant="contained"
                                    onClick={handleOpenTrailer}
                                >
                                    Trailer
                                </Button>

                                <Modal
                                    open={isOpen}
                                    onClose={handleCloseTrailer}
                                    style={{ backdropFilter: 'blur(3px)' }}
                                >
                                    <Box
                                        sx={{ ...style, width: 800, height: 450 }}
                                        className={cx('embed-responsive embed-responsive-16by9')}
                                    >
                                        <iframe
                                            className={cx('embed-responsive-item')}
                                            width={'100%'}
                                            height={'100%'}
                                            title="video-trailer"
                                            src={phim.trailer}
                                            allowFullScreen
                                        ></iframe>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    {/* Noi dung phim */}
                    <div className={cx('w-full mt-4')}>
                        <div
                            className={cx('w-fit text-[#c92522] font-medium pb-1 mb-3')}
                            style={{ borderBottom: '2px solid #c92522' }}
                        >
                            Nội dung phim
                        </div>
                        <div className={cx('text-white')} style={{ fontSize: '17px', lineHeight: '1.5' }}>
                            {phim.moTa}
                        </div>
                    </div>
                    {/* Loc Lich chieu */}
                    <div className={cx('w-full mt-4')}>
                        <div
                            className={cx('w-fit text-[#c92522] font-medium pb-1 mb-4')}
                            style={{ borderBottom: '2px solid #c92522' }}
                        >
                            Lịch chiếu
                        </div>
                        <div className={cx('flex justify-between')}>
                            {/* Chon Tinh Thanh Pho */}
                            <div className={cx('font-bold w-1/3')}>
                                <CssAutocomplete
                                    className={cx('text-2xl')}
                                    sx={{ width: '90%', borderRadius: '4px' }}
                                    options={listTinhThanhPho.map((item) => item.province_name)}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Cả nước" />}
                                    onChange={handleChangeTinhThanhPho}
                                    onInputChange={() => {
                                        setDsRap([]);
                                        setSelectedRap('');
                                    }}
                                />
                            </div>
                            {/* Chon ngay */}
                            <div className={cx('font-bold w-1/3')}>
                                <CssDatePicker
                                    value={ngayChieu}
                                    disablePast={true}
                                    onChange={(newValue) => {
                                        setNgayChieu(newValue);
                                    }}
                                    views={['year', 'month', 'day']}
                                    renderInput={(params) => (
                                        <TextField size="small" {...params} sx={{ width: '90%' }} />
                                    )}
                                />
                            </div>
                            <div className={cx('font-bold w-1/3')}>
                                <CssAutocomplete
                                    className={cx('text-2xl')}
                                    sx={{ width: '90%', borderRadius: '4px' }}
                                    value={selectedRap ? selectedRap : null}
                                    options={dsRap}
                                    getOptionLabel={(item) => item.tenRap}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Tất cả rạp" />}
                                    onChange={handleChangeRap}
                                    onInputChange={() => {
                                        setValueRap(dsRap);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Danh sach lich chieu */}
                    <div className={cx('mt-16')}>
                        {valueRap &&
                            valueRap.map((rap) => {
                                return (
                                    <ShowtimeCard
                                        key={rap.id}
                                        marap={rap.id}
                                        tenrap={rap.tenRap}
                                        maphim={phim.id}
                                        ngaychieu={ngayChieu.format('YYYY-MM-DD')}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            {/* Right */}
            <div className={cx('flex flex-col col-4')}>
                <div
                    className={cx('w-fit text-[#C92522] font-medium pb-1 mb-4')}
                    style={{ borderBottom: '2px solid #c92522', marginTop: '52px' }}
                >
                    Phim đang chiếu
                </div>
                {renderListMovie()}
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

export default DetailMovie;
