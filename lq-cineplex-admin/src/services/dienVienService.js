import request from '~/util/request';

export const getDsDienVien = async () => {
    try {
        const res = await request.get('dsdienvien');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addDienVien = async (dienVien) => {
    try {
        const res = await request.post('dsdienvien', dienVien);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const DienVienService = {
    getDsDienVien,
    addDienVien,
};

export default DienVienService;
