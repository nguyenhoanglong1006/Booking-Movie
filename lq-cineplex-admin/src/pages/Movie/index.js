import * as React from 'react';
import FilterDataMovie from '~/layouts/DefaultLayout/FilterData/FilterDataMovie';
import { Button } from '@mui/material';
import classNames from 'classnames';
import HeaderMovie from '~/layouts/DefaultLayout/HeaderContent/HeaderMovie';
import ModalThemPhim from '~/components/ModalThemPhim';
import { CinemaContext } from '~/store/Context';
import PhimService from '~/services/phimService';

const cx = classNames;

function Movie() {
    const { setOpenModalPhim, selectedPhimRows, setdsphim } = React.useContext(CinemaContext);
    const handleOpenModalThemPhim = () => {
        setOpenModalPhim(selectedPhimRows.length === 0 ? true : false);
    };

    const handleOpenModalSuaPhim = () => {
        setOpenModalPhim(selectedPhimRows.length !== 0 ? true : false);
    };

    const handleCapNhatNgungChieu = () => {
        const updatePhim = {};
        updatePhim.id = selectedPhimRows[0].id;
        updatePhim.tenPhim = selectedPhimRows[0].tenPhim;
        updatePhim.thoiLuong = selectedPhimRows[0].thoiLuong;
        updatePhim.moTa = selectedPhimRows[0].moTa;
        updatePhim.quocGia = selectedPhimRows[0].quocGia;
        updatePhim.trailer = selectedPhimRows[0].trailer;
        updatePhim.ngayKhoiChieu = selectedPhimRows[0].ngayKhoiChieu;
        updatePhim.trangThai = 'Ngừng chiếu';
        updatePhim.dsTheLoai = selectedPhimRows[0].dsTheLoai;
        updatePhim.dsDaoDien = selectedPhimRows[0].dsTheLoai;
        updatePhim.dsDienVien = selectedPhimRows[0].dsDienVien;
        updatePhim.poster = selectedPhimRows[0].poster;

        const fetchApiUpdatePhim = async () => {
            await PhimService.updatePhim(updatePhim).then(() => {
                const fetchApiDsPhim = async () => {
                    const res = await PhimService.getDsPhim();
                    setdsphim(res);
                };
                fetchApiDsPhim();
                setOpenModalPhim(false);
            });
        };
        fetchApiUpdatePhim();
    };

    return (
        <div>
            <HeaderMovie />
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
                        onClick={handleOpenModalThemPhim}
                    >
                        Thêm phim
                    </Button>

                    <ModalThemPhim phim={selectedPhimRows} />
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="warning"
                        onClick={handleOpenModalSuaPhim}
                    >
                        Sửa phim
                    </Button>
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
                        Ngừng chiếu
                    </Button>
                </div>

                <FilterDataMovie />
            </div>
        </div>
    );
}

export default Movie;
