import classNames from 'classnames';
import { AiOutlineCalendar } from 'react-icons/ai';

const cx = classNames;

function HeaderShowtime() {
    return (
        <div
            className={cx('w-full flex justify-between p-3 border-400-black border-t-2', ' bg-red-300 bg-opacity-10')}
            style={{ height: '14vh' }}
        >
            <div className={cx('flex items-center text-red-600')}>
                <AiOutlineCalendar className={cx('text-5xl ')} />
                <div className="pl-2">
                    <h2 className={cx(' text-4xl font-semibold')}>Lịch chiếu</h2>
                    <span className="text-xl ">Quản lý thông tin lịch chiếu</span>
                </div>
            </div>
        </div>
    );
}

export default HeaderShowtime;
