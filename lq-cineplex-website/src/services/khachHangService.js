import request from '~/utils/request';

export async function getUser(email) {
    if (email) {
        try {
            const res = await request.get(`dskhachhang/email/${email}`);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}

export const addKhachHang = async (khachhang) => {
    try {
        const res = await request.post('dskhachhang', khachhang);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateKhachHang = async (khachhang) => {
    try {
        const res = await request.put('dskhachhang', khachhang);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const KhachHangService = {
    getUser,
    addKhachHang,
    updateKhachHang,
};

export default KhachHangService;
