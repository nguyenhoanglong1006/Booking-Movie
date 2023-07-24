import classNames from 'classnames/bind';
import Button from '~/layouts/components/Button';
import styles from './FoodCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function FoodCard({ dichVuItem }) {
    return (
        <div className={cx('food-card')}>
            <div className={cx('food-card-item')}>
                <img className={cx('food-img')} src={dichVuItem.dichvu.hinhAnh} alt="FoodImage" />
            </div>
            <div className={cx('food-wrapper', 'food-card-item')}>
                <div className={cx('food-title')}>{dichVuItem.dichvu.tenDichVu}</div>
                <div>
                    {dichVuItem.quantity} * {dichVuItem.dichvu.donGia} đ
                </div>
            </div>
            <div className={cx('food-card-item')}>
                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    dichVuItem.dichvu.donGia * dichVuItem.quantity,
                )}{' '}
            </div>
            <Button className={cx('food-card-item')}>
                <FontAwesomeIcon icon={faCircleXmark} fontSize="25" />
            </Button>
        </div>
    );
}

export default FoodCard;
