import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '~/services/authService';

const cx = classNames;
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(() => {
            navigate('/');
            window.location.reload();
        });
    };

    return (
        <div
            className={cx(
                'w-full flex flex-col items-center justify-center h-screen bg-lq-bg-login bg-no-repeat bg-cover',
            )}
        >
            <div className={cx('flex w-[750px] justify-center pb-10')}>
                {/* <img src={logoFull} alt="logo" className={cx('w-60 h-34')} /> */}
                <h3 className={cx('text-3xl font-bold text-center text-white')}>
                    Chào mừng bạn đến với trang quảng trị hệ thống rạp phim L&Q Cineplex
                </h3>
            </div>
            <div
                className={cx(
                    'w-[400px] h-[300px] border pr-5 pl-5 text-white p-3 rounded-md g-slate-400 bg-opacity-20 ',
                )}
            >
                <h1 className="text-3xl font-bold text-center  mb-2">Đăng nhập</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username" className="text-xl">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên đăng nhập"
                            className={cx(
                                ' rounded-md w-full h-10 mt-2 mb-3 pr-2 pl-2 text-black bg-white bg-opacity-20 ',
                            )}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="text-xl">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className={cx(
                                ' rounded-md w-full h-10 mt-2 mb-4 pr-2 pl-2 text-black bg-white bg-opacity-20',
                            )}
                            name="password"
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className={cx('form-group flex  items-center justify-center')}>
                        <button
                            type="submit"
                            className={cx(
                                'w-40  bg-amber-500 rounded-md pb-2 pt-1 mb-2 hover:bg-red-500 hover:bg-opacity-20 ',
                            )}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
                <p className="text-sm text-white mt-3 italic">
                    Lưu lý: Nếu bạn quên mật khẩu, hãy liên hệ với quản lý hoặc admin để lấy lại tài khoản
                </p>
            </div>
        </div>
    );
}

export default Login;
