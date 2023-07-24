import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Menu, { MenuItem } from './Menu';
import { menuItems } from './Menu/menuItems';
 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
 
import logo from '~/layouts/asset/logo.png';
import { Avatar, Button } from '@mui/material';
import ModalDangKy from '~/components/Modal/ModalDangKy';
import { CinemaContext } from '~/store/Context';
import ModalDangNhap from '~/components/Modal/ModalDangNhap';
import ModalForgetPass from '~/components/Modal/ModalForgetPass';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '~/services/authService';
import config from '~/config';
import Dropdown from '../Dropdown/dropdown';

const cx = classNames.bind(styles);

function Header() {
    const { setOpenModalDangKy, setOpenModalDangNhap } = useContext(CinemaContext);
 
    // const [searchValue, setSearchValue] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    const { user } = useContext(CinemaContext);
 

    const navigate = useNavigate();

 
    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout().then(() => {
            navigate('/');
            window.location.reload();
        });
 
    };

    // const inputRef = useRef();

    // const handleClear = () => {
    //     setSearchValue('');
    //     setSearchResult([]);
    //     inputRef.current.focus();
    // };

    // const handleChange = (e) => {
    //     const searchValue = e.target.value;
    //     if (!searchValue.startsWith(' ')) {
    //         setSearchValue(searchValue);
    //     }
    // };

    const handleOpenModalDangKy = () => {
        setOpenModalDangKy(true);
    };

    const handleOpenModalDangNhap = () => {
        setOpenModalDangNhap(true);
    };

    const handleOpenModalDangKy = () => {
        setOpenModalDangKy(true);
    };

    const handleOpenModalDangNhap = () => {
        setOpenModalDangNhap(true);
    };

    return (
        <header className={cx('wrapper-header')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div>
                    <a href="/" className={cx('logo-cine')}>
                        <img src={logo} className={cx('logo')} alt="logo-cineplex" />
                    </a>
                </div>
                {/* Nav */}
                <div>
                    <Menu>
                        {menuItems.map((menu, index) => {
                            return <MenuItem items={menu} key={index} />;
                        })}
                    </Menu>
                </div>
                {/* Search */}
                {/* <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm phim, diễn viên,..."
                        spellCheck={false}
                        onChange={handleChange}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
 
                </div> */}
 
                {user ? (
                    <Dropdown
                        renderButton={() => {
                            return (
                                <div className={cx('flex items-center')}>
                                    <Avatar src={user && user.avatar} sx={{ width: 45, height: 45 }} />
                                    <div className="flex flex-col items-start pl-2">
                                        <div>
                                            <span className={cx('text-white ', 'user-name')}>{user && user.ten}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    >
                        <Link
                            className={cx('px-3 pt-3 w-52 flex items-center font-semibold hover:text-red-600')}
                            type="button"
                            to={config.routes.taikhoan}
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
                ) : (
                    <div className={cx('sigin')}>
                        <div className={cx('flex')} style={{ width: '272px' }}>
                            {/* Button Dang ky */}
                            <Button
                                className={cx('mx-2')}
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: 'transparent',
                                    fontSize: '16px',
                                }}
                                variant="contained"
                                onClick={handleOpenModalDangKy}
                            >
                                Đăng ký
                            </Button>
                            <ModalDangKy />
                            {/* Button Dang Nhap */}
                            <Button
                                className={cx('mx-2')}
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: '#C92522',
                                    fontSize: '16px',
                                }}
                                variant="contained"
                                onClick={handleOpenModalDangNhap}
                            >
                                Đăng nhập
                            </Button>
                            <ModalDangNhap />
                            <ModalForgetPass />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
