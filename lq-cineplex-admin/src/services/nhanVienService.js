import request from '~/util/request';

export async function getUser(email) {
    if (email) {
        try {
            const res = await request.get(`dsnhanvien/email/${email}`);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
export async function getDsNhanVien() {
    try {
        const res = await request.get('dsnhanvien');
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const addNhanVien = async (nhanvien) => {
    try {
        const res = await request.post('dsnhanvien', nhanvien);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateNhanVien = async (nhanvien) => {
    try {
        const res = await request.put('dsnhanvien', nhanvien);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const NhanVienService = {
    getUser,
    getDsNhanVien,
    addNhanVien,
    updateNhanVien,
};

export default NhanVienService;
