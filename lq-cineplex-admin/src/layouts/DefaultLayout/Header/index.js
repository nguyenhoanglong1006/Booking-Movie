import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Avatar } from '@mui/material';
import Dropdown from '~/layouts/DefaultLayout/Dropdown';
import { CinemaContext } from '~/store/Context';
import AuthService from '~/services/authService';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames;

function Header() {
    const { user } = useContext(CinemaContext);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout().then(() => {
            navigate('/login');
            window.location.reload();
        });
    };

    return (
        <div className={cx('w-full flex justify-end')} style={{ height: '9vh' }}>
            <Dropdown
                renderButton={() => {
                    return (
                        <div className={cx('flex items-center')}>
                            <Avatar src={user && user.avatar} sx={{ width: 60, height: 60 }} />
                            <div className="flex flex-col items-start pl-2">
                                <div>
                                    <h4 className={cx('font-semibold text-red-600')}>{user && user.ten}</h4>
                                </div>
                                <div className={cx('mt-1.5')}>
                                    <h5>{user && user.chucVu.tenChucVu}</h5>
                                </div>
                            </div>
                        </div>
                    );
                }}
            >
                <Link
                    className={cx('px-3 pt-3 w-52 flex items-center font-semibold hover:text-red-600')}
                    type="button"
                    to={config.routes.userprofile}
                    style={{ fontSize: '18px' }}
                >
                    Tài khoản
                </Link>

                <Link
                    className={cx('px-3 py-3 w-52 flex items-center font-semibold hover:text-red-600')}
                    style={{ fontSize: '18px' }}
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Link>
            </Dropdown>
        </div>
    );
}

export default Header;
