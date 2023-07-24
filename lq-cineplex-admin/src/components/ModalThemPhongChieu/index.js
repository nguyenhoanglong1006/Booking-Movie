import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalThemPhongChieu.module.scss';

import React, { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '~/store/Context';
import PhongChieuService from '~/services/phongchieuService';
import GheService from '~/services/gheService';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 2,
};

function ModalThemPhongChieu({ rap }) {
    const { openModalPhongChieu, setOpenModalPhongChieu, setDsPhongChieu } = useContext(CinemaContext);
    const [listLoaiPhong, setListLoaiPhong] = useState([]);
    const [loaiPhong, setLoaiPhong] = useState('');
    const [tenPhongChieu, setTenPhongChieu] = useState('');

    // Load ds loai phong chieu
    useEffect(() => {
        const fetchApiLoaiPhong = async () => {
            const res = await PhongChieuService.getDsLoaiPhongChieu();
            setListLoaiPhong(res);
        };
        fetchApiLoaiPhong();
    }, []);

    const handleCloseModal = () => {
        setOpenModalPhongChieu(false);
        setLoaiPhong('');
    };

    const handleChangeTenPhong = (e) => {
        setTenPhongChieu(e.target.value);
    };

    const handleChangeLoaiPhong = (_, value) => {
        setLoaiPhong(value);
    };

    const handleThemPhongChieu = () => {
        const newPhongChieu = {};
        newPhongChieu.tenPhongChieu = tenPhongChieu;
        newPhongChieu.loaiPhongChieu = loaiPhong;
        newPhongChieu.rap = rap;
        newPhongChieu.trangThai = 'Hoạt động';

        const fetchApiThemPhongChieu = async () => {
            await PhongChieuService.addPhongChieu(newPhongChieu).then((res) => {
                const maPhongChieu = res.id;
                const fetchApiAddGheToPhongChieu = async () => {
                    await GheService.addGheToPhongChieu(maPhongChieu);
                };
                fetchApiAddGheToPhongChieu();
                const fetchApi = async () => {
                    const res = await PhongChieuService.getDsPhongChieu();
                    setDsPhongChieu(res);
                };
                fetchApi();
                setOpenModalPhongChieu(false);
            });
        };
        fetchApiThemPhongChieu();
        setLoaiPhong('');
    };

    return (
        <Modal
            open={openModalPhongChieu}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 500, height: 350 }} className={cx('container-modal')}>
                <div className={cx('title-modal')}>Thông tin phòng chiếu</div>
                <div className={cx('title', 'title-wrapper')}>
                    <div className={cx('title-rap')}>Rạp: {rap.tenRap}</div>
                </div>
                <div className={cx('wrapper-modal')}>
                    {/* Ten phong chieu */}
                    <div className={cx('text-field')}>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            label="Tên phòng chiếu"
                            variant="outlined"
                            onChange={handleChangeTenPhong}
                        />
                    </div>

                    {/* Loai phong chieu */}
                    <div className={cx('text-field')}>
                        <Autocomplete
                            className={cx('text-2xl bg-white rounded-xl')}
                            value={loaiPhong ? loaiPhong : null}
                            options={listLoaiPhong}
                            getOptionLabel={(item) => item.tenLoaiPhongChieu}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Loại phòng chiếu" />}
                            onChange={handleChangeLoaiPhong}
                        />
                    </div>

                    {/* Trang thai */}
                    <div className={cx('text-field')}>
                        <TextField
                            size="small"
                            label="Trạng thái"
                            variant="outlined"
                            disabled
                            defaultValue={'Hoạt động'}
                        />
                    </div>
                </div>
                <div className={cx('group-button')}>
                    {/* Button Huy */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '8px',

                            '&:hover': {
                                backgroundColor: '#ff0000',
                                color: 'white',
                            },
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </Button>
                    {/* Button them phong chieu */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '8px',

                            '&:hover': {
                                backgroundColor: '#1aff1a',
                                color: 'white',
                            },
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleThemPhongChieu}
                    >
                        Thêm phòng chiếu
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalThemPhongChieu;
