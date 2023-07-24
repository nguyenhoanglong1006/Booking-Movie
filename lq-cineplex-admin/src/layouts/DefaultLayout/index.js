import classNames from 'classnames/bind';

import Header from '../DefaultLayout/Header';
import Menu from '../DefaultLayout/Menu';
import styles from '../DefaultLayout/DefaultLayout.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import AuthService from '~/services/authService';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigate = () => {
            if (user == null) {
                navigate(config.routes.login);
            }
        };
        handleNavigate();
    });

    return (
        <div className={cx(' w-full h-screen flex')}>
            <Menu />
            <div style={{ width: '85vw', height: 'auto', marginLeft: '15vw' }}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
