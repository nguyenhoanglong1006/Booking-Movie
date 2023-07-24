import * as phimService from '~/services/phimService';
import * as rapService from '~/services/rapService';
import * as lichchieuService from '~/services/lichchieuService';
import * as veService from '~/services/veService';
import { CinemaContext } from './Context';
import { useEffect, useState } from 'react';
import NhanVienService from '~/services/nhanVienService';
import DichVuService from '~/services/dichVuService';
import KhachHangService from '~/services/khachHangService';
import PhongChieuService from '~/services/phongchieuService';
import * as voucherService from '~/services/voucherService';

function Provider({ children }) {
    const [dsphim, setdsphim] = useState([]);
    const [dsRap, setDsRap] = useState([]);
    const [dsPhongChieu, setDsPhongChieu] = useState([]);
    const [dsVe, setDsVe] = useState([]);
    const [dsLichChieu, setDsLichChieu] = useState([]);
    const [dsNhanVien, setDsNhanVien] = useState([]);
    const [dsKhachHang, setDsKhachHang] = useState([]);
    const [dsVoucher, setDsVoucher] = useState([]);

    const [activeStep, setActiveStep] = useState(0);
    const [user, setUser] = useState(null);
    const [dsDichVu, setDsDichVu] = useState([]);
    const [selectedDichVu, setSelectedDichVu] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedPhimRows, setSelectedPhimRows] = useState([]);
    const [selectionModelPhim, setSelectionModelPhim] = useState([]);
    const [selectedRapRows, setSelectedRapRows] = useState([]);
    const [selectionModelRap, setSelectionModelRap] = useState([]);
    const [selectedPhongChieuRows, setSelectedPhongChieuRows] = useState([]);
    const [selectionModelPhongChieu, setSelectionModelPhongChieu] = useState([]);
    const [selectedDichVuRows, setSelectedDichVuRows] = useState([]);
    const [selectionModelDichVu, setSelectionModelDichVu] = useState([]);
    const [selectedVoucherRows, setSelectedVoucherRows] = useState([]);
    const [selectionModelVoucher, setSelectionModelVoucher] = useState([]);

    const [selectedNhanVienRows, setSelectedNhanVienRows] = useState([]);
    const [selectionModelNhanVien, setSelectionModelNhanVien] = useState([]);

    const [openModalPhim, setOpenModalPhim] = useState(false);
    const [openModalLichChieu, setOpenModalLichChieu] = useState(false);
    const [openModalBapNuoc, setOpenModalBapNuoc] = useState(false);
    const [openModalRap, setOpenModalRap] = useState(false);
    const [openModalPhongChieu, setOpenModalPhongChieu] = useState(false);
    const [openModalNhanVien, setOpenModalNhanVien] = useState(false);
    const [openModalKhachHang, setOpenModalKhachHang] = useState(false);
    const [openModalVoucher, setOpenModalVoucher] = useState(false);

    // Load Danh sach phim
    useEffect(() => {
        const fetchApi = async () => {
            const res = await phimService.getDsPhim();
            setdsphim(res);
        };
        fetchApi();
    }, []);

    // Load Danh sach rap
    useEffect(() => {
        const fetchApi = async () => {
            const res = await rapService.getDsRap();
            setDsRap(res);
        };
        fetchApi();
    }, []);

    // Load danh sach phong chieu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await PhongChieuService.getDsPhongChieu();
            setDsPhongChieu(res);
        };
        fetchApi();
    }, []);

    // Load Danh sach Lich Chieu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await lichchieuService.getDsLichChieu();
            setDsLichChieu(res);
        };
        fetchApi();
    }, []);

    // Load Danh sach ve
    useEffect(() => {
        const fetchApi = async () => {
            const res = await veService.getDsVe();
            setDsVe(res);
        };
        fetchApi();
    }, []);

    // Get User Profile
    useEffect(() => {
        const fetchApi = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await NhanVienService.getUser(user && user.email);
            setUser(res);
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

    // Load danh sach khach hang
    useEffect(() => {
        const fetchApi = async () => {
            const res = await KhachHangService.getDsKhachHang();
            setDsKhachHang(res);
        };
        fetchApi();
    }, []);

    // Load danh sach nhan vien
    useEffect(() => {
        const fetchDsNhanVien = async () => {
            const res = await NhanVienService.getDsNhanVien();
            setDsNhanVien(res);
        };
        fetchDsNhanVien();
    }, []);

    // Load danh sach vourcher
    useEffect(() => {
        const fetchApi = async () => {
            const res = await voucherService.getDsVoucher();
            setDsVoucher(res);
        };
        fetchApi();
    }, []);
    return (
        <CinemaContext.Provider
            value={{
                dsphim,
                setdsphim,
                dsRap,
                setDsRap,
                dsPhongChieu,
                setDsPhongChieu,
                dsLichChieu,
                setDsLichChieu,
                dsVe,
                setDsVe,
                dsNhanVien,
                setDsNhanVien,
                dsKhachHang,
                setDsKhachHang,
                dsDichVu,
                setDsDichVu,
                dsVoucher,
                setDsVoucher,

                selectedSeats,
                setSelectedSeats,
                activeStep,
                setActiveStep,
                selectedDichVu,
                setSelectedDichVu,
                selectedPhimRows,
                setSelectedPhimRows,
                selectionModelPhim,
                setSelectionModelPhim,
                selectionModelRap,
                setSelectionModelRap,
                selectedRapRows,
                setSelectedRapRows,
                selectionModelPhongChieu,
                setSelectionModelPhongChieu,
                selectedPhongChieuRows,
                setSelectedPhongChieuRows,
                selectionModelDichVu,
                setSelectionModelDichVu,
                selectedDichVuRows,
                setSelectedDichVuRows,
                selectionModelVoucher,
                setSelectionModelVoucher,
                selectedVoucherRows,
                setSelectedVoucherRows,
                selectedNhanVienRows,
                setSelectedNhanVienRows,
                selectionModelNhanVien,
                setSelectionModelNhanVien,
                user,

                openModalPhim,
                setOpenModalPhim,
                openModalLichChieu,
                setOpenModalLichChieu,
                openModalBapNuoc,
                setOpenModalBapNuoc,
                openModalRap,
                setOpenModalRap,
                openModalPhongChieu,
                setOpenModalPhongChieu,
                openModalNhanVien,
                setOpenModalNhanVien,
                openModalKhachHang,
                setOpenModalKhachHang,
                openModalVoucher,
                setOpenModalVoucher,
            }}
        >
            {children}
        </CinemaContext.Provider>
    );
}

export default Provider;
