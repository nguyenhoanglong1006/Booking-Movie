import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ items }) {
    return (
        <li>
            {items.submenu ? (
                <>
                    <NavLink
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                        to={items.to}
                        aria-haspopup="menu"
                    >
                        <span className={cx('title', 'title-submenu')}>{items.title}</span>
                    </NavLink>
                    <Dropdown submenus={items.submenu} />
                </>
            ) : (
                <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={items.to}>
                    <span className={cx('title')}>{items.title}</span>
                </NavLink>
            )}
        </li>
    );
}

MenuItem.prototype = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default MenuItem;
