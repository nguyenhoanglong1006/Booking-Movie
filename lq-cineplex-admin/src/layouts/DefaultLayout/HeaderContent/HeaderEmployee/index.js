import classNames from 'classnames';
import { FaUserTie } from 'react-icons/fa';

const cx = classNames;

function HeaderEmployee() {
    return (
        <div
            className={cx('w-full flex justify-between p-3 border-400-black border-t-2', ' bg-red-300 bg-opacity-10')}
            style={{ height: '14vh' }}
        >
            <div className={cx('flex items-center text-red-600')}>
                <FaUserTie className={cx('text-5xl ')} />
                <div className="pl-2">
                    <h2 className={cx(' text-4xl font-semibold')}>Nhân viên</h2>
                    <span className="text-xl ">Quản lý thông tin nhân viên</span>
                </div>
            </div>
        </div>
    );
}

export default HeaderEmployee;
