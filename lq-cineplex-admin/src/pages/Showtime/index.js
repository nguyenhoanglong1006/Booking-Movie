import HeaderShowtime from '~/layouts/DefaultLayout/HeaderContent/HeaderShowtime';
import FilterDataShowTime from '~/layouts/DefaultLayout/FilterData/FileterDataShowTime';
import { Autocomplete, Button, TextField } from '@mui/material';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RapService from '~/services/rapService';
import PhimService from '~/services/phimService';
import { CinemaContext } from '~/store/Context';
import ModalThemLichChieu from '~/components/ModalThemLichChieu';
const cx = classNames;
function Showtime() {
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [listRap, setListRap] = useState([]);
    const [listPhim, setListPhim] = useState([]);
    const [selectedRap, setSelectedRap] = useState();
    const [selectedPhim, setSelectedPhim] = useState();
    const { setOpenModalLichChieu } = useContext(CinemaContext);

    useEffect(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
            setListTinhThanhPho(res.data.results);
        });
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await PhimService.getDsPhimDangSapChieu();
            setListPhim(res);
        };
        fetchApi();
    }, []);

    const handleChangeTinhThanhPho = (_, value) => {
        const fetchApi = async () => {
            const res = await RapService.getDsRapByTinhThanhPho(value);
            setListRap(res);
        };
        if (value !== null) {
            fetchApi();
        }
    };

    const handleChangeRap = (_, value) => {
        setSelectedRap(value);
    };

    const handleChangePhim = (_, value) => {
        setSelectedPhim(value);
    };

    const handleOpenModalThemLichChieu = () => {
        if (selectedRap && selectedPhim) {
            setOpenModalLichChieu(true);
        } else {
            alert('Please select cinema and movie');
        }
    };

    return (
        <div>
            <HeaderShowtime />
            <div>
                <div className={cx('flex items-center border-400-black border-2 pl-6 pr-6')} style={{ height: '12vh' }}>
                    {/* Chon Tinh Thanh Pho */}
                    <div className={cx('font-bold rounded-xl')}>
                        <Autocomplete
                            className={cx('text-2xl bg-white rounded-xl ')}
                            sx={{ width: 250 }}
                            options={listTinhThanhPho.map((item) => item.province_name)}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
                            onChange={handleChangeTinhThanhPho}
                            onInputChange={() => {
                                setListRap([]);
                                setSelectedRap('');
                            }}
                        />
                    </div>
                    {/* Chon Rap */}
                    <div className={cx('font-bold ml-5')}>
                        <Autocomplete
                            className={cx('text-2xl bg-white rounded-xl')}
                            value={selectedRap ? selectedRap : null}
                            sx={{ width: 250 }}
                            options={listRap}
                            getOptionLabel={(item) => item.tenRap}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Rạp chiếu" />}
                            onChange={handleChangeRap}
                        />
                    </div>
                    {/* Chon Phim */}
                    <div className={cx('font-bold ml-5')}>
                        <Autocomplete
                            className={cx('text-2xl bg-white rounded-xl')}
                            sx={{ width: 250 }}
                            options={listPhim}
                            getOptionLabel={(item) => item.tenPhim}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Phim" />}
                            onChange={handleChangePhim}
                        />
                    </div>
                    <div className={cx('ml-5')}>
                        <Button
                            sx={{ fontSize: '15px' }}
                            variant="outlined"
                            color="success"
                            type="button"
                            onClick={handleOpenModalThemLichChieu}
                        >
                            Thêm lịch
                        </Button>
                        <ModalThemLichChieu
                            rap={selectedRap ? selectedRap : { tenRap: '' }}
                            phim={selectedPhim ? selectedPhim : { tenPhim: '' }}
                        />
                        {/* Button Sua Lich */}
                        <Button
                            sx={{ fontSize: '15px', marginLeft: '15px' }}
                            variant="outlined"
                            color="warning"
                            type="button"
                        >
                            Sửa lịch
                        </Button>
                        {/* Button Sua Lich */}
                        <Button
                            sx={{ fontSize: '15px', marginLeft: '15px' }}
                            variant="outlined"
                            color="error"
                            type="button"
                        >
                            Hủy lịch
                        </Button>
                    </div>
                </div>
                <FilterDataShowTime />
            </div>
        </div>
    );
}

export default Showtime;
