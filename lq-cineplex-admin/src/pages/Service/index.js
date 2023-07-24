import HeaderService from '~/layouts/DefaultLayout/HeaderContent/HeaderService';
import FilterDataService from '~/layouts/DefaultLayout/FilterData/FilterDataService';
import ModalThemBapNuoc from '~/components/ModalThemBapNuoc';
import { Button } from '@mui/material';
import React from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames';
const cx = classNames;
function Service() {
    const { setOpenModalBapNuoc, selectedDichVuRows } = React.useContext(CinemaContext);

    const handleOpenModalThemBapNuoc = () => {
        setOpenModalBapNuoc(selectedDichVuRows.length === 0 ? true : false);
    };

    const handleOpenModalUpdateDichVu = () => {
        setOpenModalBapNuoc(selectedDichVuRows.length !== 0 ? true : false);
    };
    return (
        <div>
            <HeaderService />
            <div>
                <div className={cx('border-400-black border-2 flex items-center pl-8 pr-8')} style={{ height: '12vh' }}>
                    {/* Button Them Bap Nuoc */}
                    <Button
                        sx={{
                            fontSize: '15px',
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleOpenModalThemBapNuoc}
                    >
                        Thêm bắp nước
                    </Button>
                    <ModalThemBapNuoc dichvu={selectedDichVuRows} />
                    {/* Button Sua bap nuoc */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="warning"
                        onClick={handleOpenModalUpdateDichVu}
                    >
                        Sửa bắp nước
                    </Button>
                    {/* Button Xoa Bap nuoc */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                    >
                        Xóa bắp nước
                    </Button>
                </div>
                <FilterDataService />
            </div>
        </div>
    );
}

export default Service;
