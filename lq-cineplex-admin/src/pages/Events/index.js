import HeaderEvent from '~/layouts/DefaultLayout/HeaderContent/HeaderEvent';
import { Button } from '@mui/material';
import classNames from 'classnames';
import FilterDataVoucher from '~/layouts/DefaultLayout/FilterData/FilterDataVoucher';
import ModelThemVoucher from '~/components/ModalThemVoucher';
import { CinemaContext } from '~/store/Context';
import React from 'react';
import VoucherService from '~/services/voucherService';

const cx = classNames;

function Event() {
    const { setOpenModalVoucher, selectedVoucherRows, setDsVoucher } = React.useContext(CinemaContext);
    const handleOpenModalThemVoucher = () => {
        setOpenModalVoucher(selectedVoucherRows.length === 0 ? true : false);
    };
    const handleOpenModalUpdateVoucher = () => {
        setOpenModalVoucher(selectedVoucherRows.length !== 0 ? true : false);
    };
    const handleCapNhatNgung = () => {
        const updateVoucher = {};
        updateVoucher.id = selectedVoucherRows[0].id;
        updateVoucher.tenVoucher = selectedVoucherRows[0].tenVoucher;
        updateVoucher.ngayBatDau = selectedVoucherRows[0].ngayBatDau;
        updateVoucher.ngayKetThu = selectedVoucherRows[0].ngayKetThu;
        updateVoucher.trangThai = 'Ngừng hoạt động';
        updateVoucher.soLuong = selectedVoucherRows[0].soLuong;
        updateVoucher.giaTri = selectedVoucherRows[0].giaTri;
        updateVoucher.maVoucher = selectedVoucherRows[0].maVoucher;

        const fetchApiUpdateVoucher = async () => {
            await VoucherService.updateVoucher(updateVoucher).then(() => {
                const fetchApiDsVoucher = async () => {
                    const res = await VoucherService.getDsVoucher();
                    setDsVoucher(res);
                };
                fetchApiDsVoucher();
                setOpenModalVoucher(false);
            });
        };
        fetchApiUpdateVoucher();
    };

    return (
        <div>
            <HeaderEvent />
            <div>
                <div
                    className={cx('flex items-center border-400-black border-2 pl-8 pr-8 ')}
                    style={{ height: '12vh' }}
                >
                    <Button
                        sx={{
                            fontSize: '15px',
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleOpenModalThemVoucher}
                    >
                        Thêm Voucher
                    </Button>
                    <ModelThemVoucher rap={selectedVoucherRows} />
                    {/* Button Sua Rap */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="warning"
                        onClick={handleOpenModalUpdateVoucher}
                    >
                        Sửa Voucher
                    </Button>
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCapNhatNgung}
                    >
                        Ngưng Voucher
                    </Button>
                </div>
                <FilterDataVoucher />
            </div>
        </div>
    );
}

export default Event;
