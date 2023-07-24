import classNames from 'classnames/bind';
import styles from './ContentBooking.module.scss';
import { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import request from '~/util/request';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { Link } from 'react-router-dom';
import config from '~/config';
import { List, ListItemButton, ListItemText, styled } from '@mui/material';
import Divider from '@mui/material/Divider';

const cx = classNames.bind(styles);

const CssListItemButton = styled(ListItemButton)({
    '&:hover': {
        backgroundColor: '#f4d3d3',
    },
    '&:focus': {
        backgroundColor: '#f4d3d3',
    },
    '&.Mui-selected': {
        backgroundColor: '#f4d3d3',
        color: '#c92522',
        '&:hover': {
            backgroundColor: '#f4d3d3',
        },
    },
});
function ContextBooking() {
    const { dsRap } = useContext(CinemaContext);
    const [dsPhim, setDsPhim] = useState([]);
    const [dsLichChieu, setDsLichChieu] = useState([]);
    const [selectedIndexRap, setSelectedIndexRap] = useState(-1);
    const [selectedIndexPhim, setSelectedIndexPhim] = useState(-1);

    const handleListRapClick = (_, index, rap) => {
        const handleLoadPhim = () => {
            setDsPhim([]);
            setDsLichChieu([]);
            getDsPhim(rap.id);
        };
        handleLoadPhim();
        setSelectedIndexRap(index);
        setSelectedIndexPhim(-1);
    };

    const handleListPhimClick = (_, index, phim) => {
        const handleLoadLichChieu = () => {
            getDsLichChieu(phim.id, phim.maRap);
        };
        handleLoadLichChieu();
        setSelectedIndexPhim(index);
    };

    async function getDsPhim(maRap) {
        if (maRap) {
            try {
                const res = await request.get(`dsphim/marap/${maRap}`);
                setDsPhim(res.data.map((phim) => ({ ...phim, maRap: maRap })));
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function getDsLichChieu(maPhim, maRap) {
        if (maPhim && maRap) {
            try {
                const res = await request.get(`dslichchieu/maPhim/${maPhim}/maRap/${maRap}`);
                setDsLichChieu(res.data);
            } catch (e) {
                console.log(e);
            }
        }
    }

    function RapItem({ rap, index }) {
        return (
            <>
                {index !== 0 ? <Divider /> : <></>}
                <CssListItemButton
                    selected={selectedIndexRap === index}
                    onClick={(event) => handleListRapClick(event, index, rap)}
                >
                    <ListItemText
                        primary={<div style={{ fontSize: '20px' }}>{rap.tenRap}</div>}
                        sx={{ textAlign: 'center' }}
                    />
                </CssListItemButton>
            </>
        );
    }

    function PhimItem({ phim, index }) {
        return (
            <>
                {index !== 0 ? <Divider /> : <></>}
                <CssListItemButton
                    selected={selectedIndexPhim === index}
                    onClick={(event) => handleListPhimClick(event, index, phim)}
                >
                    <ListItemText
                        primary={<div style={{ fontSize: '20px' }}>{phim.tenPhim}</div>}
                        sx={{ textAlign: 'center' }}
                    />
                </CssListItemButton>
            </>
        );
    }

    function LichChieuItem({ lichchieu, index }) {
        const ngayChieu = moment(lichchieu.ngayChieu).locale('vi', vi).format('dddd, DD/MM/YYYY');
        const gioBatDau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');

        return (
            <>
                {index !== 0 ? <Divider /> : <></>}
                <CssListItemButton>
                    <div>{ngayChieu.charAt(0).toUpperCase() + ngayChieu.slice(1)}</div>
                    <Link to={config.routes.datvechitiet} state={lichchieu}>
                        <button className={cx('w-40 ml-5 bg-red-500 rounded-md pb-2 pt-2 hover:bg-opacity-20 ')}>
                            {gioBatDau}
                        </button>
                    </Link>
                </CssListItemButton>
            </>
        );
    }

    return (
        <div className={cx('flex justify-between mt-2 mx-3')}>
            {/* Chon rap */}
            <div style={{ width: '32%' }}>
                <div className={cx('panel-default')}>
                    <div className={cx('panel-heading')}>
                        <h4 className={cx('panel-title')}>Chọn rạp</h4>
                    </div>
                    <List component="nav" style={{ maxHeight: '70vh', overflow: 'auto', padding: 0 }}>
                        {dsRap.map((rap, index) => {
                            return <RapItem key={index} rap={rap} index={index} />;
                        })}
                    </List>
                </div>
            </div>
            {/* Chon phim */}
            <div style={{ width: '32%' }}>
                <div className={cx('panel-default')}>
                    <div className={cx('panel-heading')}>
                        <h4 className={cx('panel-title')}>Chọn phim</h4>
                    </div>

                    <List component="nav" style={{ maxHeight: '70vh', overflow: 'auto', padding: 0 }}>
                        {dsPhim.length !== 0 ? (
                            dsPhim?.map((phim, index) => {
                                return <PhimItem key={index} phim={phim} index={index} />;
                            })
                        ) : (
                            <ListItemText
                                primary={<div style={{ fontSize: '20px' }}>Vui lòng chọn rạp</div>}
                                sx={{ textAlign: 'center' }}
                            />
                        )}
                    </List>
                </div>
            </div>
            {/*  Lich chieu */}
            <div style={{ width: '32%' }}>
                <div className={cx('panel-default')}>
                    <div className={cx('panel-heading')}>
                        <h4 className={cx('panel-title')}>Lịch chiếu</h4>
                    </div>

                    <List component="nav" style={{ maxHeight: '70vh', overflow: 'auto', padding: 0 }}>
                        {dsLichChieu.length !== 0 ? (
                            dsLichChieu?.map((lichchieu, index) => {
                                return <LichChieuItem key={index} lichchieu={lichchieu} index={index} />;
                            })
                        ) : (
                            <ListItemText
                                primary={<div style={{ fontSize: '20px' }}>Vui lòng chọn lịch chiếu</div>}
                                sx={{ textAlign: 'center' }}
                            />
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default ContextBooking;
