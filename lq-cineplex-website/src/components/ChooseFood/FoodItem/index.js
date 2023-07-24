import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '~/layouts/components/Button';
import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';

const cx = classNames.bind(styles);

function FoodItem({ dichvu }) {
    const { selectedDichVu, setSelectedDichVu } = useContext(CinemaContext);

    const getFoodQuantity = (id) => {
        const quantity = selectedDichVu.find((dichVuItem) => dichVuItem.dichvu.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    };

    const handleAddFood = () => {
        const id = dichvu.id;
        const quantity = getFoodQuantity(id);
        if (quantity === 0) {
            setSelectedDichVu([...selectedDichVu, { dichvu: dichvu, quantity: 1 }]);
        } else {
            setSelectedDichVu(
                selectedDichVu.map((dichVuItem) =>
                    dichVuItem.dichvu.id === id ? { ...dichVuItem, quantity: dichVuItem.quantity + 1 } : dichVuItem,
                ),
            );
        }
    };

    const handleRemoveFood = () => {
        const id = dichvu.id;
        const quantity = getFoodQuantity(id);
        if (quantity === 1) {
            removeFoodById(id);
        } else {
            setSelectedDichVu(
                selectedDichVu.map((dichVuItem) =>
                    dichVuItem.dichvu.id === id ? { ...dichVuItem, quantity: dichVuItem.quantity - 1 } : dichVuItem,
                ),
            );
        }
    };

    const removeFoodById = (id) => {
        const arrayDichVu = selectedDichVu;
        const index = arrayDichVu.findIndex((x) => x.dichvu.id === id);
        arrayDichVu.splice(index, 1);
        setSelectedDichVu([...arrayDichVu]);
    };

    return (
        <div className={cx('wrapper')}>
            <img className={cx('img-food')} src={dichvu.hinhAnh} alt="FoodImage" />

            <div className={cx('title')}>{dichvu.tenDichVu}</div>
            <div className={cx('cost')}>
                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dichvu.donGia)}
            </div>
            <div className={cx('quantity-wrapper')}>
                <Button onClick={handleRemoveFood}>
                    <RemoveCircleOutlineIcon sx={{ fontSize: 25 }} />
                </Button>
                <div className={cx('quantity')}>{getFoodQuantity(dichvu.id)}</div>
                <Button onClick={handleAddFood}>
                    <AddCircleOutlineIcon sx={{ fontSize: 25 }} />
                </Button>
            </div>
        </div>
    );
}

export default FoodItem;
