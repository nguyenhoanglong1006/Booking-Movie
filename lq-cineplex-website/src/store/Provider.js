import KhachHangService from '~/services/khachHangService';
import { CinemaContext } from './Context';
import { useEffect, useState } from 'react';
import PhimService from '~/services/phimService';
import RapService from '~/services/rapService';
import DichVuService from '~/services/dichVuService';

function Provider({ children }) {
    const [user, setUser] = useState(null);
    const [dsphim, setdsphim] = useState([]);
    const [dsRap, setDsRap] = useState([]);
    const [dsPhongChieu, setDsPhongChieu] = useState([]);
    const [dsLichChieu, setDsLichChieu] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    const [dsDichVu, setDsDichVu] = useState([]);
    const [selectedDichVu, setSelectedDichVu] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [openModalDangKy, setOpenModalDangKy] = useState(false);
    const [openModalDangNhap, setOpenModalDangNhap] = useState(false);
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
    const [openModalForgetPass, setOpenModalForgetPass] = useState(false);

    // Load Danh sach phim
    useEffect(() => {
        const fetchApi = async () => {
            const res = await PhimService.getDsPhim();
            setdsphim(res);
        };
        fetchApi();
    }, []);

    // Get User Profile
    useEffect(() => {
        const fetchApi = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await KhachHangService.getUser(user && user.email);
            setUser(res);
        };
        fetchApi();
    }, []);

    // Load Danh sach rap
    useEffect(() => {
        const fetchApi = async () => {
            const res = await RapService.getDsRap();
            setDsRap(res);
        };
        fetchApi();
    }, []);

    // Load Danh sach dich vu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await DichVuService.getDsDichVu();
            setDsDichVu(res);
        };
        fetchApi();
    }, []);

    return (
        <CinemaContext.Provider
            value={{
                user,
                dsphim,
                setdsphim,
                dsRap,
                setDsRap,
                dsPhongChieu,
                setDsPhongChieu,
                dsLichChieu,
                setDsLichChieu,
                dsDichVu,
                setDsDichVu,

                selectedSeats,
                setSelectedSeats,
                activeStep,
                setActiveStep,
                selectedDichVu,
                setSelectedDichVu,

                openModalDangKy,
                setOpenModalDangKy,
                openModalDangNhap,
                setOpenModalDangNhap,
                openModalChangePassword,
                setOpenModalChangePassword,
                openModalForgetPass,
                setOpenModalForgetPass,
            }}
        >
            {children}
        </CinemaContext.Provider>
    );
}

export default Provider;
