import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import styles from './TicketBooking.module.scss';
import { Breadcrumbs, Link, Box, Typography, TextField, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClearIcon from '@mui/icons-material/Clear';
import BookingStepper from '~/components/BookingStepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import Button from '~/layouts/components/Button';
import SeatCard from '~/components/SeatCard';
import FoodCard from '~/components/FoodCard';
import { CinemaContext } from '~/store/Context';
import { useLocation } from 'react-router-dom';
import GheService from '~/services/gheService';
import moment from 'moment';
import vi from 'moment/locale/vi';

const cx = classNames.bind(styles);

function TicketBooking() {
    const { selectedSeats, activeStep, setActiveStep, selectedDichVu } = useContext(CinemaContext);
    const location = useLocation();
    const lichchieu = location.state;
    const movie = lichchieu.phim;
    const ngayChieu = moment(lichchieu.ngayChieu).locale('vi', vi).format('dddd, DD/MM/YYYY');
    const gioBatDau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
    const [activeVourcher, setActiceVourcher] = useState(0);
    const [valueTextField, setValueTextField] = useState('');
    const [dsGhePhongChieu, setDsGhePhongChieu] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await GheService.getDsGheMaPhongChieu(lichchieu.phongChieu.id);
            setDsGhePhongChieu(res);
        };
        fetchApi();
    }, [lichchieu.phongChieu.id]);

    const handleShowInputVourcher = () => {
        setActiceVourcher(1);
    };

    const handleClearTextField = () => {
        setValueTextField('');
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSkip = () => {
        setActiveStep(activeStep + 2);
    };

    function showButton() {
        if (activeStep === 0) {
            return (
                <>
                    <button className={cx('button')} onClick={handleSkip}>
                        Thanh Toán
                    </button>
                    <button className={cx('button', 'button-next')} onClick={handleNext}>
                        Tiếp Tục
                    </button>
                </>
            );
        } else if (activeStep === 1) {
            return (
                <>
                    <button className={cx('button')} onClick={handleBack}>
                        Trở về
                    </button>
                    <button className={cx('button', 'button-next')} onClick={handleNext}>
                        Tiếp tục
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <button className={cx('button')} onClick={handleBack}>
                        Trở về
                    </button>
                    <button className={cx('button', 'button-next')} onClick={handleNext}>
                        Thanh Toán
                    </button>
                </>
            );
        }
    }

    function getTotalCostFood(array) {
        let totalCost = 0;
        array.forEach(function (value) {
            totalCost += value.dichvu.donGia * value.quantity;
        });
        return totalCost;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('breadcrumb')}>
                <Box m={2}>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<NavigateNextIcon sx={{ fontSize: 25, color: 'gray' }} />}
                        color="#fef7f7"
                    >
                        <Link
                            underline="hover"
                            fontSize={18}
                            href={config.routes.trangchu}
                            sx={{ color: 'gray', '&:hover': { color: '#c92522' } }}
                        >
                            Trang chủ
                        </Link>

                        <Link
                            href={config.routes.phim}
                            underline="hover"
                            fontSize={18}
                            sx={{ color: 'gray', '&:hover': { color: '#c92522' } }}
                        >
                            Phim đang chiếu
                        </Link>
                        <Typography fontSize={18}>{lichchieu.phim.tenPhim}</Typography>
                        <Typography fontSize={18}>Đặt vé</Typography>
                    </Breadcrumbs>
                </Box>
            </div>
            {/* Content */}
            <div className={cx('ticketBooking-content row')}>
                {activeStep !== 3 && activeStep !== 2 ? (
                    <>
                        {/* Ticket Booking Left */}
                        <div className={cx('ticketBooking-left col-8')}>
                            <div>
                                <BookingStepper lichchieu={lichchieu} dsGhe={dsGhePhongChieu} />
                            </div>
                        </div>
                        {/* Ticket Booking Right */}
                        <div className={cx('ticketBooking-right col-4')}>
                            <div className={cx('ticket-info')}>
                                <div className={cx('ticket-info-top')}>
                                    <div className={cx('movie-title')}>{movie.tenPhim}</div>
                                    <div className={cx('cinema-name')}>{lichchieu.phongChieu.rap.tenRap}</div>
                                    <div className={cx('ticket-time')}>
                                        Suất chiếu: {gioBatDau} |{' '}
                                        {ngayChieu.charAt(0).toUpperCase() + ngayChieu.slice(1)}
                                    </div>
                                    <div className={cx('ticket-line')}></div>
                                </div>

                                <div className={cx('ticket-info-between')}>
                                    <div className={cx('ticket-text')}>Vé</div>
                                    <div className={cx('ticket-total')}>
                                        {selectedSeats.length} vé,{' '}
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            selectedSeats.length * 85000,
                                        )}
                                    </div>
                                </div>
                                {selectedSeats.map((seat, index) => {
                                    return <SeatCard key={index} seat={seat} price={85000} />;
                                })}
                                <div className={cx('ticket-info-between')}>
                                    <div className={cx('ticket-text')}>Bắp & Nước</div>
                                    <div className={cx('ticket-total')}>
                                        {selectedDichVu.length} combo,{' '}
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            getTotalCostFood(selectedDichVu),
                                        )}
                                    </div>
                                </div>
                                {selectedDichVu.map((dichVuItem, index) => {
                                    return <FoodCard key={index} dichVuItem={dichVuItem} />;
                                })}
                                <div className={cx('ticket-vouchers')}>
                                    {activeVourcher === 0 ? (
                                        <div className={cx('d-flex align-items-center')}>
                                            <Button onClick={handleShowInputVourcher}>
                                                <FontAwesomeIcon icon={faPlusSquare} fontSize="25" />
                                            </Button>
                                            <span>Vouchers | Mã giảm giá</span>
                                        </div>
                                    ) : (
                                        <div className={cx('d-flex justify-content-between')}>
                                            <TextField
                                                value={valueTextField}
                                                variant="outlined"
                                                onChange={(newValue) => {
                                                    setValueTextField(newValue.target.value);
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            onClick={handleClearTextField}
                                                            sx={{ visibility: valueTextField ? 'visible' : 'hidden' }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    ),
                                                }}
                                                placeholder="Nhập mã Vourcher"
                                                inputProps={{
                                                    style: { fontSize: 15, padding: 10 },
                                                }}
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        padding: 0,
                                                    },
                                                    width: 250,
                                                }}
                                            />

                                            <button className={cx('button-vourcher')}>Áp dụng</button>
                                        </div>
                                    )}
                                </div>

                                <div className={cx('ticket-info-bottom')}>
                                    <div className={cx('line-bottom')}>
                                        <div className={cx('ticket-line')}></div>
                                    </div>
                                    <div className={cx('total-amount')}>
                                        <div>Tổng cộng:</div>
                                        <div>
                                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                selectedSeats.length * 85000 + getTotalCostFood(selectedDichVu),
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('group-button')}>{showButton()}</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <BookingStepper lichchieu={lichchieu} />
                    </div>
                )}
            </div>
            <div></div>
        </div>
    );
}

export default TicketBooking;
