import moment from 'moment';
import vi from 'moment/locale/vi';
import Barcode from 'react-barcode';
import classNames from 'classnames';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WeekendIcon from '@mui/icons-material/Weekend';
const cx = classNames;

function TicketCard({ ve }) {
    console.log(ve);
    const ngayChieu = moment(ve.lichChieu.ngayChieu).locale('vi', vi).format('dddd, DD/MM/YYYY');
    const gioBatDau = moment(ve.lichChieu.gioBatDau, 'HH:mm:ss').format('HH:mm');
    const gioKetThuc = moment(ve.lichChieu.gioKetThuc, 'HH:mm:ss').format('HH:mm');
    return (
        <div className=" w-96 bg-[#F4E5D7] m-10 rounded-lg py-3" style={{ height: 'fit-content' }}>
            <div className="flex flex-col items-center px-2 pb-3">
                <div className={cx('text-3xl text-center font-bold')}>{ve.lichChieu.phim.tenPhim}</div>
                <div className={cx('flex items-center mb-3')}>
                    <LocationOnIcon sx={{ color: '#ffc008' }} fontSize="large" />
                    <div className={cx('text-xl')}>{ve.lichChieu.phongChieu.rap.tenRap}</div>
                </div>
                <div className="w-full px-3 flex justify-between mb-3">
                    <div className="w-1/2">
                        <div>Ngày</div>
                        <div>{ngayChieu.charAt(0).toUpperCase() + ngayChieu.slice(1)}</div>
                    </div>
                    <div className="w-1/3">
                        <div>Thời gian</div>
                        <div>
                            {gioBatDau} - {gioKetThuc}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between px-5">
                    <div className="flex flex-col justify-center">
                        <WeekendIcon fontSize="large" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div>Phòng</div>
                        <div>{ve.lichChieu.phongChieu.tenPhongChieu}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div>Hàng</div>
                        <div>{ve.ghe.hang}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div>Cột</div>
                        <div>{ve.ghe.cot}</div>
                    </div>
                </div>
            </div>
            <div className="border-dashed border-2 border-black mb-2"></div>
            <div className="flex flex-col items-center">
                <div>
                    Giá vé: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ve.giaVe)}{' '}
                </div>
                <Barcode value={'id_ve:' + ve.id} background="#F4E5D7" displayValue={false} />
                <div>Vui lòng xuất trình vé này tại cửa soát vé</div>
            </div>
        </div>
    );
}

export default TicketCard;
