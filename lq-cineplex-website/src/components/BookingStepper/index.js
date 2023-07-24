import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stepper, StepLabel, Button, Step, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChairIcon from '@mui/icons-material/Chair';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PaymentIcon from '@mui/icons-material/Payment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ChooseSeat from '../ChooseSeat';
import ChooseFood from '../ChooseFood';
import classNames from 'classnames/bind';
import styles from './BookingStepper.module.scss';
import { CinemaContext } from '~/store/Context';
import moment from 'moment';
import vi from 'moment/locale/vi';
import DonDatService from '~/services/donDatService';
import ChiTietDichVuService from '~/services/chiTietDichVuService';
import VeService from '~/services/veService';
import TicketCard from '../TicketCard';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const cx = classNames.bind(styles);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#C92522',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#C92522',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#615E5E',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#615E5E',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#C92522',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#C92522',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <ChairIcon sx={{ fontSize: 25 }} />,
        2: <FastfoodIcon sx={{ fontSize: 25 }} />,
        3: <PaymentIcon sx={{ fontSize: 25 }} />,
        4: <ConfirmationNumberIcon sx={{ fontSize: 25 }} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Chọn ghế', 'Chọn bắp nước', 'Thanh Toán', 'Vé của bạn'];

function BookingStepper({ lichchieu, dsGhe }) {
    const { activeStep, setActiveStep, selectedSeats, setSelectedSeats, selectedDichVu, setSelectedDichVu, user } =
        React.useContext(CinemaContext);
    const [dsVeDaDat, setDsVeDaDat] = React.useState([]);
    const movie = lichchieu.phim;
    const ngayChieu = moment(lichchieu.ngayChieu).locale('vi', vi).format('dddd, DD/MM/YYYY');
    const gioBatDau = moment(lichchieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
    const [openPaypal, setOpenPaypal] = React.useState(false);

    const navigate = useNavigate();

    const dsTenGhe = [];
    const dsTenDichVu = [];

    selectedSeats.forEach((seat) => {
        dsTenGhe.push(seat.hang + seat.cot);
    });

    selectedDichVu.forEach((dichvu) => {
        dsTenDichVu.push(dichvu.dichvu.tenDichVu + '(' + dichvu.quantity + ')');
    });

    function loadDsChiTietDichVu(donDat) {
        const dschiTietDichVu = [];
        selectedDichVu.forEach((dichvu) => {
            const chiTietDichVu = {};
            chiTietDichVu.donDat = donDat;
            chiTietDichVu.dichVu = dichvu.dichvu;
            chiTietDichVu.soLuong = dichvu.quantity;
            chiTietDichVu.thanhTien = dichvu.dichvu.donGia * dichvu.quantity;
            dschiTietDichVu.push(chiTietDichVu);
        });
        return dschiTietDichVu;
    }

    function loadDsVe(donDat) {
        const dsve = [];
        selectedSeats.forEach((seat) => {
            const ve = {};
            ve.giaVe = 85000;
            ve.ghe = seat;
            ve.lichChieu = lichchieu;
            ve.donDat = donDat;
            dsve.push(ve);
        });
        return dsve;
    }

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
                    <button className={cx('button', 'button-next')} onClick={handleThanhToan}>
                        Thanh Toán
                    </button>
                </>
            );
        }
    }

    const handleThanhToan = () => {
        setOpenPaypal(true);
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

    const handleReset = () => {
        setActiveStep(0);
        setSelectedSeats([]);
        setSelectedDichVu([]);
        navigate(config.routes.trangchu);
    };

    function getTotalCostFood(array) {
        let totalCost = 0;
        array.forEach(function (value) {
            totalCost += value.dichvu.donGia * value.quantity;
        });
        return totalCost;
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <>
                        <ChooseSeat lichchieu={lichchieu} dsGhe={dsGhe} />
                    </>
                );
            case 1:
                return (
                    <>
                        <ChooseFood />
                    </>
                );
            case 2:
                return (
                    <div className={cx('ticketBooking-right')}>
                        <div className={cx('ticket-info')}>
                            <div className={cx('title')}>Thông tin đặt vé</div>
                            <div className={cx('row mt-4')}>
                                <div className={cx('d-flex justify-content-center col-5')}>
                                    <img className={cx('poster')} src={lichchieu.phim.poster} alt="poster phim" />
                                </div>
                                <div className={cx('col-7 text-xl pr-5')}>
                                    <div className={cx(' font-bold mb-3')}>{movie.tenPhim}</div>
                                    <div className={cx('flex mb-2')}>
                                        <div className={cx('font-bold mr-2')}>Rạp: </div>{' '}
                                        {lichchieu.phongChieu.rap.tenRap} | Phòng: {lichchieu.phongChieu.tenPhongChieu}
                                    </div>
                                    <div className={cx('flex mb-2')}>
                                        <div className={cx('font-bold mr-2')}>Suất chiếu:</div> {gioBatDau} |{' '}
                                        {ngayChieu.charAt(0).toUpperCase() + ngayChieu.slice(1)}
                                    </div>
                                    <div className={cx('flex mb-2')}>
                                        <div className={cx('font-bold mr-2')}>Ghế:</div> {dsTenGhe.join(', ')}
                                    </div>
                                    <div className={cx('flex')}>
                                        <div className={cx('font-bold mr-2')}>Bắp nước:</div> {dsTenDichVu.join(', ')}
                                    </div>
                                    <div className={cx('mt-5 italic text-red-700')}>
                                        {'(*) Vui lòng kiểm tra thông tin đặt vé trước khi thanh toán'}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('ticket-info-bottom')}>
                                <div className={cx('line-bottom')}>
                                    <div className={cx('ticket-line')}></div>
                                </div>
                                <div className={cx('total-amount')}>
                                    <div>Giá vé:</div>
                                    <div>
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            selectedSeats.length * 85000,
                                        )}
                                    </div>
                                </div>
                                <div className={cx('total-amount')}>
                                    <div>Dịch vụ:</div>
                                    <div>
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            getTotalCostFood(selectedDichVu),
                                        )}
                                    </div>
                                </div>
                                <div className={cx('total-amount')}>
                                    <div>Khuyến mãi:</div>
                                    <div>
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}
                                    </div>
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
                                <div>
                                    {openPaypal === true ? (
                                        <PayPalScriptProvider
                                            options={{
                                                'client-id':
                                                    'AUvLbiTrI3ay_S81ctKx9KBxZvUJG1bV_BJ-SDs-NgFTvohSNth28JzYWrhrRFmeyplXSP9TW8zFbURR',
                                            }}
                                        >
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: (
                                                                        (selectedSeats.length * 85000 +
                                                                            getTotalCostFood(selectedDichVu)) *
                                                                        0.00004
                                                                    ).toFixed(2),
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(_, actions) => {
                                                    return actions.order.capture().then(() => {
                                                        alert('Thanh toan thanh cong ');
                                                        const ngayDat = new Date();
                                                        const tongTien =
                                                            selectedSeats.length * 85000 +
                                                            getTotalCostFood(selectedDichVu);
                                                        const fetchApiDonDat = async () => {
                                                            await DonDatService.addDonDat(ngayDat, user, tongTien).then(
                                                                (res) => {
                                                                    const dschiTietDichVu = loadDsChiTietDichVu(res);
                                                                    const fetchApiChiTietDichVu = async () => {
                                                                        await ChiTietDichVuService.addAllChiTietDichVu(
                                                                            dschiTietDichVu,
                                                                        ).then((res) => {});
                                                                    };
                                                                    fetchApiChiTietDichVu();
                                                                    const dsve = loadDsVe(res);
                                                                    const fetchApiVe = async () => {
                                                                        await VeService.addAllVe(dsve).then((res) => {
                                                                            setDsVeDaDat(res);
                                                                        });
                                                                    };
                                                                    fetchApiVe();
                                                                },
                                                            );
                                                        };
                                                        fetchApiDonDat();
                                                        setActiveStep(3);
                                                    });
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={cx('flex flex-col items-center mt-8')}>
                        <div className={cx('text-[#cccccc] text-3xl text-center')}>Mua vé thành công</div>
                        <p className={cx('px-60 text-[#cccccc] text-center text-xl mt-3')}>
                            Bạn đã đặt vé phim{' '}
                            <span className={cx('text-2xl text-[#c92522]')}>{lichchieu.phim.tenPhim}</span> thành công.
                            Vé cũng sẽ được gửi đến email của bạn. Xuất trình vé tại điểm soát vé của rạp.Bạn có thể
                            nhận đồ ăn và nước đã đặt tại quầy bán vé bằng cách quét mã vạch trên vé của mình
                        </p>
                        <div className={cx('text-[#cccccc] text-xl text-center mt-3')}>Xem chi tiết vé của bạn</div>
                        <div className={cx('mt-3')}>
                            <Grid sx={{ flexGrow: 1 }} container spacing={12}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={3}>
                                        {dsVeDaDat.map((ve, index) => (
                                            <TicketCard key={index} ve={ve} />
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label, index) => {
                    const stepProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                <Box className="labelStepper" sx={{ fontSize: 18, color: '#F4E5D7' }}>
                                    {label}
                                </Box>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {/* Button */}
            {activeStep === steps.length - 1 ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }} component={'span'}>
                        {getStepContent(activeStep)}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleReset} sx={{ fontSize: 18, color: '#C92522', border: 'solid' }}>
                            Trang chủ
                        </Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }} component={'span'}>
                        {getStepContent(activeStep)}
                    </Typography>
                </React.Fragment>
            )}
        </Box>
    );
}

export default BookingStepper;
