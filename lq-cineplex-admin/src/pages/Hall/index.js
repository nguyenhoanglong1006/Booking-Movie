import HeaderHall from '~/layouts/DefaultLayout/HeaderContent/HeaderHall';
import FilterDataHall from '~/layouts/DefaultLayout/FilterData/FilterDataHall';
import { Autocomplete, Button, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import ModalThemPhongChieu from '~/components/ModalThemPhongChieu';
import axios from 'axios';
import RapService from '~/services/rapService';

const cx = classNames;

function Hall() {
    const { setOpenModalPhongChieu } = useContext(CinemaContext);
    const [listTinhThanhPho, setListTinhThanhPho] = useState([]);
    const [listRap, setListRap] = useState([]);
    const [selectedRap, setSelectedRap] = useState();

    useEffect(() => {
        axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
            setListTinhThanhPho(res.data.results);
        });
    }, []);

    const handleOpenModalThemPhongChieu = () => {
        if (selectedRap) {
            setOpenModalPhongChieu(true);
        } else {
            alert('Please select cinema');
        }
    };

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

    return (
        <div>
            <HeaderHall />
            <div>
                <div className={cx('border-400-black border-2 flex items-center pl-8 pr-8')} style={{ height: '12vh' }}>
                    {/* Chon tinh thanh pho */}
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
                    {/* Chon rap */}
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
                    {/* Button Them Phong Chieu */}
                    <div className={cx('ml-5')}>
                        <Button
                            sx={{
                                fontSize: '15px',
                            }}
                            type="button"
                            variant="outlined"
                            color="success"
                            onClick={handleOpenModalThemPhongChieu}
                        >
                            Thêm Phòng Chiếu
                        </Button>
                        <ModalThemPhongChieu rap={selectedRap ? selectedRap : { tenRap: '' }} />
                        <Button
                            sx={{ fontSize: '15px', marginLeft: '15px' }}
                            variant="outlined"
                            color="warning"
                            type="button"
                        >
                            Sửa phòng chiếu
                        </Button>
                        {/* Button Sua Lich */}
                        <Button
                            sx={{ fontSize: '15px', marginLeft: '15px' }}
                            variant="outlined"
                            color="error"
                            type="button"
                        >
                            Hủy phòng chiếu
                        </Button>
                    </div>
                </div>
                <FilterDataHall />
            </div>
        </div>
    );
}

export default Hall;
