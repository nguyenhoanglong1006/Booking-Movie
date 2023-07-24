import classNames from 'classnames';
import HeaderBookingTicket from '~/layouts/DefaultLayout/HeaderContent/HeaderBookingTicket';
import ContentBooking from '~/pages/BookingTicket/ContextBooking';

const cx = classNames;
function BookingTicket() {
    return (
        <div className={cx('w-full h-full')}>
            <HeaderBookingTicket />
            <div>
                <ContentBooking />
            </div>
        </div>
    );
}

export default BookingTicket;
