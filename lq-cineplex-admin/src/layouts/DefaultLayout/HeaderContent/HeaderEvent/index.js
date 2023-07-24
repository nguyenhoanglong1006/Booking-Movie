import classNames from 'classnames';
import { BsCalendar2Event } from 'react-icons/bs';

const cx = classNames;

function HeaderEvent() {
    return (
        <div
            className={cx('w-full flex justify-between p-3 border-400-black border-t-2', ' bg-red-300 bg-opacity-10')}
            style={{ height: '14vh' }}
        >
            <div className={cx('flex items-center text-red-600')}>
                <BsCalendar2Event className={cx('text-5xl ')} />
                <div className="pl-2">
                    <h2 className={cx(' text-4xl font-semibold')}>Vourcher</h2>
                    <span className="text-xl ">Quản lý thông tin Vourcher</span>
                </div>
            </div>
        </div>
    );
}

export default HeaderEvent;
