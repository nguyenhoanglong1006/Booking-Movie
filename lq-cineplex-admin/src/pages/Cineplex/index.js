import FilterDataCineplex from '~/layouts/DefaultLayout/FilterData/FilterDataCineplex';
import HeaderCineplex from '~/layouts/DefaultLayout/HeaderContent/HeaderCineplex';
import { Button } from '@mui/material';
import ModelThemRap from '~/components/ModalThemRap';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames';
import React from 'react';
import RapService from '~/services/rapService';

const cx = classNames;
function Cineplex() {
    const { setOpenModalRap, selectedRapRows, setDsRap } = React.useContext(CinemaContext);
    const handleOpenModalThemRap = () => {
        setOpenModalRap(selectedRapRows.length === 0 ? true : false);
    };

    const handleOpenModalUpdateRap = () => {
        setOpenModalRap(selectedRapRows.length !== 0 ? true : false);
    };
    const handleCapNhatNgungChieu = () => {
        const updateRap = {};
        updateRap.id = selectedRapRows[0].id;
        updateRap.tenRap = selectedRapRows[0].tenRap;
        updateRap.diaChi = selectedRapRows[0].diaChi;
        updateRap.moTa = selectedRapRows[0].moTa;
        updateRap.trangThai = 'Ngừng hoạt động';
        updateRap.hinhAnh = selectedRapRows[0].hinhAnh;

        const fetchApiUpdateRap = async () => {
            await RapService.updateRap(updateRap).then(() => {
                const fetchApiDsRap = async () => {
                    const res = await RapService.getDsRap();
                    setDsRap(res);
                };
                fetchApiDsRap();
                setOpenModalRap(false);
            });
        };
        fetchApiUpdateRap();
    };

    return (
        <div>
            <HeaderCineplex />
            <div>
                <div className={cx('border-400-black border-2 flex items-center pl-8 pr-8')} style={{ height: '12vh' }}>
                    {/* Button Them Rap */}
                    <Button
                        sx={{
                            fontSize: '15px',
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleOpenModalThemRap}
                    >
                        Thêm Rạp
                    </Button>
                    <ModelThemRap rap={selectedRapRows} />
                    {/* Button Sua Rap */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="warning"
                        onClick={handleOpenModalUpdateRap}
                    >
                        Sửa rạp
                    </Button>
                    {/*Button Xoa Rap  */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCapNhatNgungChieu}
                    >
                        Tạm ngưng
                    </Button>
                </div>
                <FilterDataCineplex />
            </div>
        </div>
    );
}

export default Cineplex;
