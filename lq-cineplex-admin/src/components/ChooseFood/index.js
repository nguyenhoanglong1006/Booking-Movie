import classNames from 'classnames/bind';
import styles from './ChooseFood.module.scss';
import FoodItem from './FoodItem';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';

const cx = classNames.bind(styles);

function ChooseFood() {
    const { dsDichVu } = useContext(CinemaContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-card')}>
                {dsDichVu.map((dichvu, index) => {
                    return <FoodItem key={index} dichvu={dichvu} />;
                })}
            </div>
        </div>
    );
}

export default ChooseFood;
