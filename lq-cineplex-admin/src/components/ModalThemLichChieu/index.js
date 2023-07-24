import classNames from 'classnames/bind';
import styles from './ModalThemLichChieu.module.scss';
import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import moment from 'moment/moment';
import PhongChieuService from '~/services/phongchieuService';
import LichChieuService from '~/services/lichchieuService';

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

function ModalThemLichChieu({ rap, phim }) {
    const { openModalLichChieu, setOpenModalLichChieu, setDsLichChieu } = useContext(CinemaContext);

    const [ngayChieu, setNgayChieu] = useState(null);
    const [phongChieu, setPhongChieu] = useState('');
    const [gioBatDau, setGioBatDau] = useState(null);
    const [gioKetThuc, setGioKetThuc] = useState(null);
    const [listPhongTrong, setListPhongTrong] = useState([]);

    const handleCloseModal = () => {
        setOpenModalLichChieu(false);
    };

    const handleChangePhongChieu = (_, value) => {
        setPhongChieu(value);
    };

    const handleChangeGioBatDau = (newValue) => {
        setGioBatDau(newValue);
        const gioKetThuc = moment(newValue).add(phim.thoiLuong, 'minutes');
        setGioKetThuc(gioKetThuc);

        const nc = ngayChieu.format('YYYY-MM-DD');
        const gbd = moment(newValue).format('HH:mm:ss');
        const gkt = gioKetThuc.format('HH:mm:ss');

        const fetchApi = async () => {
            const res = await PhongChieuService.getDsPhongChieuTrong(rap.id, nc, gbd, gkt);
            setListPhongTrong(res);
        };
        fetchApi();
    };

    const handleThemLichChieu = () => {
        const newLichChieu = {};
        newLichChieu.gioBatDau = gioBatDau.format('HH:mm:ss');
        newLichChieu.gioKetThuc = gioKetThuc.format('HH:mm:ss');
        newLichChieu.ngayChieu = ngayChieu.format('YYYY-MM-DD');
        newLichChieu.phim = phim;
        newLichChieu.phongChieu = phongChieu;
        newLichChieu.trangThai = 'Bình thường';

        const fetchApiLichChieu = async () => {
            await LichChieuService.addLichChieu(newLichChieu).then((res) => {
                console.log(res);
                setNgayChieu(null);
                setPhongChieu('');
                setGioBatDau(null);
                setGioKetThuc(null);
                const fetchApi = async () => {
                    const res = await LichChieuService.getDsLichChieu();
                    setDsLichChieu(res);
                };
                fetchApi();
                setOpenModalLichChieu(false);
            });
        };
        fetchApiLichChieu();
    };
    return (
        <Modal
            open={openModalLichChieu}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 800, height: 370 }} className={cx('container-modal')}>
                <div className={cx('title', 'title-modal')}>Thông tin Lịch Chiếu</div>
                <div className={cx('title', 'title-wrapper')}>
                    <div className={cx('title-phim')}>Phim: {phim.tenPhim}</div>
                    <div className={cx('title-rap')}>Rạp: {rap.tenRap}</div>
                </div>
                <div className={cx('wrapper-modal')}>
                    <Box className={cx('wrapper-modal-left')}>
                        <div className={cx('text-field')}>
                            <DatePicker
                                label="Ngày Chiếu"
                                value={ngayChieu}
                                disablePast={true}
                                views={['year', 'month', 'day']}
                                onChange={(newValue) => {
                                    setNgayChieu(newValue);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>
                        <div className={cx('text-field')}>
                            <Autocomplete
                                className={cx('text-2xl bg-white rounded-xl')}
                                options={listPhongTrong}
                                getOptionLabel={(item) => item.tenPhongChieu}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Phòng chiếu" />}
                                onChange={handleChangePhongChieu}
                            />
                        </div>
                    </Box>
                    <Box className={cx('wrapper-modal-right')}>
                        <div className={cx('text-field')}>
                            <TimePicker
                                label="Giờ bắt đầu"
                                value={gioBatDau}
                                onChange={handleChangeGioBatDau}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </div>
                        <div className={cx('text-field')}>
                            <TimePicker
                                label="Giờ kết thúc"
                                disabled
                                value={gioKetThuc}
                                onChange={() => {}}
                                renderInput={(params) => <TextField size="small" {...params} />}
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
                        Huỷ
                    </Button>
                    {/* Button Them Lich Chieu */}
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
                        onClick={handleThemLichChieu}
                    >
                        Thêm Lịch Chiếu
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemLichChieu;
