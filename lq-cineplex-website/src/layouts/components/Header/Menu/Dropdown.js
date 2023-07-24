import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const Dropdown = ({ submenus }) => {
    return (
        <ul className={cx('dropdown')}>
            {submenus.map((submenu, index) => (
                <li key={index}>
                    <NavLink className={cx('menu-item')} to={submenu.to}>
                        <span className={cx('title')}>{submenu.title}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
