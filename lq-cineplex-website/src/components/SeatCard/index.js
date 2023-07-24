import classNames from 'classnames/bind';
import Button from '~/layouts/components/Button';
import styles from './SeatCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SeatCard({ seat, price }) {
    return (
        <div className={cx('ticket-seat-card')}>
            <div className={cx('ticket-number-seat', 'ticket-seat-card-item')}>{seat.hang + seat.cot}</div>
            <div className={cx('ticket-room-wrapper', 'ticket-seat-card-item')}>
                <div>Phòng</div>
                <div>{seat.phongChieu.tenPhongChieu}</div>
            </div>
            <div className={cx('ticket-room-wrapper', 'ticket-seat-card-item')}>
                <div>Hàng</div>
                <div>{seat.hang}</div>
            </div>
            <div className={cx('ticket-room-wrapper', 'ticket-seat-card-item')}>
                <div>Ghế</div>
                <div>{seat.cot}</div>
            </div>
            <div className={cx('ticket-seat-card-item')}>
                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
            </div>
            <Button className={cx('ticket-seat-card-item')}>
                <FontAwesomeIcon icon={faCircleXmark} fontSize="25" />
            </Button>
        </div>
    );
}

export default SeatCard;
