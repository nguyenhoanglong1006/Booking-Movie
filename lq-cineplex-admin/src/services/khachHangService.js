import request from '~/util/request';
import authHeader from './authHeader';

export const getDsKhachHang = async () => {
    try {
        const dskhachhang = await request.get('dskhachhang', { headers: authHeader() });
        return dskhachhang.data;
    } catch (error) {
        console.log(error);
    }
};
export const addKhachHang = async (khachhang) => {
    try {
        const res = await request.post('dskhachhang', khachhang);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
const KhachHangService = {
    getDsKhachHang,
    addKhachHang,
};

export default KhachHangService;
