import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import LichChieuService from '~/services/lichchieuService';
import classNames from 'classnames/bind';
import vi from 'moment/locale/vi';
import { Button } from '@mui/material';
import { CinemaContext } from '~/store/Context';

const cx = classNames;

function ShowtimeCard({ marap, tenrap, maphim, ngaychieu }) {
    const [dsLichChieu, setDsLichChieu] = useState([]);
    const { user, setOpenModalDangNhap } = useContext(CinemaContext);
    const navigate = useNavigate();

    // Load danh sach lich chieu
    useEffect(() => {
        const fetchApiLichChieu = async () => {
            await LichChieuService.getDsLichChieuPhimRapNgayChieu(maphim, marap, ngaychieu).then((res) => {
                const listlichchieu = [];
                res.forEach((lichchieu) => {
                    if (
                        moment(lichchieu.ngayChieu).locale('vi', vi).format('DD/MM/YYYY') ===
                        moment(new Date()).locale('vi', vi).format('DD/MM/YYYY')
                    ) {
                        if (
                            parseInt(moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm').split(':')[0]) >
                            moment(new Date()).get('hour')
                        ) {
                            listlichchieu.push(lichchieu);
                        }
                    } else {
                        listlichchieu.push(lichchieu);
                    }
                });
                setDsLichChieu(listlichchieu);
            });
        };
        fetchApiLichChieu();
    }, [maphim, marap, ngaychieu]);

    return (
        <>
            {dsLichChieu.length !== 0 ? (
                <div className={cx('mb-5')}>
                    <div className={cx('w-fit pl-5 pr-10 py-2 bg-[#a11e1b] text-[#fff] text-xl')}>{tenrap}</div>
                    <div className={cx('flex py-10 px-5')} style={{ border: '2px solid #b8b8b8' }}>
                        {dsLichChieu.map((lichchieu) => {
                            const gioBatDau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
                            return (
                                <div key={lichchieu.id}>
                                    <Button
                                        sx={{
                                            fontSize: '18px',
                                            color: '#b8b8b8',
                                            borderColor: '#b8b8b8',
                                            borderWidth: '2px',
                                            marginRight: '20px',
                                            '&:hover': {
                                                borderColor: '#c92522',
                                                color: '#c92522',
                                                borderWidth: '2px',
                                            },
                                        }}
                                        variant="outlined"
                                        onClick={() => {
                                            user
                                                ? navigate(config.routes.datve, { state: lichchieu })
                                                : setOpenModalDangNhap(true);
                                        }}
                                    >
                                        {gioBatDau}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default ShowtimeCard;
