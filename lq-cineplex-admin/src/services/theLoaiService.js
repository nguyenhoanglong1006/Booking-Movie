import request from '~/util/request';

export const getDsTheLoai = async () => {
    try {
        const res = await request.get('dstheloai');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addTheLoai = async (theLoai) => {
    try {
        const res = await request.post('dstheloai', theLoai);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const TheLoaiService = {
    getDsTheLoai,
    addTheLoai,
};

export default TheLoaiService;
