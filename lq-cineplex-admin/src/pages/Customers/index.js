import { Button } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import FilterDataCustomer from '~/layouts/DefaultLayout/FilterData/FilterDataCustomer';
import HeaderCustomers from '~/layouts/DefaultLayout/HeaderContent/HeaderCustomers';
import { CinemaContext } from '~/store/Context';
import ModalThemKhachHang from '~/components/ModalThemKhachHang';
const cx = classNames;
function Customers() {
    const { setOpenModalKhachHang } = React.useContext(CinemaContext);
    const handleOpenModalThemKhachHang = () => {
        setOpenModalKhachHang(true);
    };
    return (
        <div>
            <HeaderCustomers />
            <div>
                <div className={cx('border-400-black border-2 flex items-center pl-8 pr-8')} style={{ height: '12vh' }}>
                    <Button
                        sx={{
                            fontSize: '15px',
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleOpenModalThemKhachHang}
                    >
                        Thêm khách hàng
                    </Button>
                    <ModalThemKhachHang />
                </div>
                <FilterDataCustomer />
            </div>
        </div>
    );
}

export default Customers;
