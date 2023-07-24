import classNames from 'classnames';
import { BsTicketDetailedFill } from 'react-icons/bs';

const cx = classNames;

function HeaderBookingTicket() {
    return (
        <div
            className={cx('w-full flex justify-between p-3 border-400-black border-y-2', ' bg-red-300 bg-opacity-10')}
            style={{ height: '14vh' }}
        >
            <div className={cx('flex items-center text-red-600')}>
                <BsTicketDetailedFill className={cx('text-5xl ')} />
                <div className="pl-2">
                    <h2 className={cx(' text-4xl font-semibold')}>Đặt vé</h2>
                    <span className="text-xl ">Quản lý thông tin vé</span>
                </div>
            </div>
        </div>
    );
}

export default HeaderBookingTicket;
