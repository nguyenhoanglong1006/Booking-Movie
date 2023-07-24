import { Button } from '@mui/material';
import FilterDataEmployee from '~/layouts/DefaultLayout/FilterData/FilterDataEmployee';
import HeaderEmployee from '~/layouts/DefaultLayout/HeaderContent/HeaderEmployee';
import classNames from 'classnames';
import React from 'react';
import { CinemaContext } from '~/store/Context';
import ModalThemNhanVien from '~/components/ModalThemNhanVien';
import NhanVienService from '~/services/nhanVienService';

const cx = classNames;
function Employee() {
    const { setOpenModalNhanVien, selectedNhanVienRows, setDsNhanVien, setSelectionModelNhanVien } =
        React.useContext(CinemaContext);

    const handleOpenModalThemNhanVien = () => {
        setOpenModalNhanVien(selectedNhanVienRows.length === 0 ? true : false);
    };

    const handleOpenModalSuaNhanVien = () => {
        setOpenModalNhanVien(selectedNhanVienRows.length !== 0 ? true : false);
    };

    const handleCapNhatNgungViec = () => {
        const newNhanVien = {};
        newNhanVien.id = selectedNhanVienRows[0].id;
        newNhanVien.ten = selectedNhanVienRows[0].ten;
        newNhanVien.ngaySinh = selectedNhanVienRows[0].ngaySinh;
        newNhanVien.gioiTinh = selectedNhanVienRows[0].gioiTinh;
        newNhanVien.dienThoai = selectedNhanVienRows[0].dienThoai;
        newNhanVien.email = selectedNhanVienRows[0].email;
        newNhanVien.avatar = selectedNhanVienRows[0].avatar;
        newNhanVien.trangThai = 'Ngưng việc';
        newNhanVien.chucVu = selectedNhanVienRows[0].chucVu;
        newNhanVien.diaChi = selectedNhanVienRows[0].diaChi;
        const fetchApiUpdateNhanVien = async () => {
            await NhanVienService.updateNhanVien(newNhanVien).then(() => {
                const fetchApi = async () => {
                    const res = await NhanVienService.getDsNhanVien();
                    setDsNhanVien(res);
                };
                fetchApi();
                setOpenModalNhanVien(false);
            });
        };
        fetchApiUpdateNhanVien();
        setSelectionModelNhanVien([]);
    };

    return (
        <div>
            <HeaderEmployee />
            <div>
                <div className={cx('border-400-black border-2 flex items-center pl-8 pr-8')} style={{ height: '12vh' }}>
                    {/* Button Them Nhan Vien */}
                    <Button
                        sx={{
                            fontSize: '15px',
                        }}
                        type="button"
                        variant="outlined"
                        color="success"
                        onClick={handleOpenModalThemNhanVien}
                    >
                        Thêm nhân viên
                    </Button>
                    <ModalThemNhanVien nhanvien={selectedNhanVienRows} />
                    {/* Button Sua Nhan Vien */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="warning"
                        onClick={handleOpenModalSuaNhanVien}
                    >
                        Sửa nhân viên
                    </Button>
                    {/* Button Ngung viec */}
                    <Button
                        sx={{
                            fontSize: '15px',
                            marginLeft: '20px',
                        }}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCapNhatNgungViec}
                    >
                        Ngưng việc
                    </Button>
                </div>
                <FilterDataEmployee />
            </div>
        </div>
    );
}

export default Employee;
