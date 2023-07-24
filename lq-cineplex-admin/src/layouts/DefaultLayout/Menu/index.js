import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import logo from '~/layouts/asset/logo.png';
import { FaHome, FaUserTie, FaUsers } from 'react-icons/fa';
import { MdLocalDrink } from 'react-icons/md';
import { GiTheater } from 'react-icons/gi';
import { BiCameraMovie } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsTicketDetailedFill, BsCalendar2Event } from 'react-icons/bs';
import { VscGroupByRefType } from 'react-icons/vsc';
import config from '~/config';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';

const cx = classNames.bind(styles);

function Menu() {
    const { user } = useContext(CinemaContext);

    console.log(user);

    return (
        <>
            {user && user.chucVu.id === 2 ? (
                <div className={cx('bg-black text-white', 'wrapper-menu')}>
                    <div className={cx('w-full flex justify-center items-center')} style={{ height: '20vh' }}>
                        <img src={logo} alt="logo" style={{ width: '15vh' }} />
                    </div>
                    <NavLink to={config.routes.trangchu} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <FaHome className={cx('text-3xl mr-4')} />
                        Trang chủ
                    </NavLink>

                    <NavLink to={config.routes.datve} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BsTicketDetailedFill className={cx('text-3xl mr-4')} />
                        Đặt Vé
                    </NavLink>

                    <NavLink to={config.routes.ve} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BsTicketDetailedFill className={cx('text-3xl mr-4')} /> Vé
                    </NavLink>

                    <NavLink to={config.routes.phim} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BiCameraMovie className={cx('text-3xl mr-4')} /> Phim
                    </NavLink>

                    <NavLink
                        to={config.routes.lichchieu}
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                    >
                        <AiOutlineCalendar className={cx('text-3xl mr-4')} /> Lịch chiếu
                    </NavLink>

                    <NavLink to={config.routes.rap} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <VscGroupByRefType className={cx('text-3xl mr-4')} /> Rạp Phim
                    </NavLink>

                    <NavLink
                        to={config.routes.phongchieu}
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                    >
                        <GiTheater className={cx('text-3xl mr-4')} /> Phòng chiếu
                    </NavLink>

                    <NavLink to={config.routes.sukien} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BsCalendar2Event className={cx('text-3xl mr-4')} /> Vourcher
                    </NavLink>

                    <NavLink to={config.routes.bapnuoc} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <MdLocalDrink className={cx('text-3xl mr-4')} /> Bắp nước
                    </NavLink>

                    <NavLink to={config.routes.nhanvien} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <FaUserTie className={cx('text-3xl mr-4')} /> Nhân viên
                    </NavLink>

                    <NavLink
                        to={config.routes.khachhang}
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                    >
                        <FaUsers className={cx('text-3xl mr-4')} /> Khách hàng
                    </NavLink>
                </div>
            ) : (
                <div className={cx('bg-black text-white', 'wrapper-menu')}>
                    <div className={cx('w-full flex justify-center items-center')} style={{ height: '20vh' }}>
                        <img src={logo} alt="logo" style={{ width: '15vh' }} />
                    </div>
                    <NavLink to={config.routes.trangchu} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <FaHome className={cx('text-3xl mr-4')} />
                        Trang chủ
                    </NavLink>

                    <NavLink to={config.routes.datve} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BsTicketDetailedFill className={cx('text-3xl mr-4')} />
                        Đặt Vé
                    </NavLink>

                    <NavLink to={config.routes.ve} className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <BsTicketDetailedFill className={cx('text-3xl mr-4')} /> Vé
                    </NavLink>

                    <NavLink
                        to={config.routes.khachhang}
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                    >
                        <FaUsers className={cx('text-3xl mr-4')} /> Khách hàng
                    </NavLink>
                </div>
            )}
        </>
    );
}

export default Menu;
