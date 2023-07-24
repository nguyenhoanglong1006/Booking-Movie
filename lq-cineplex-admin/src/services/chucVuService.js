import request from '~/util/request';

export const getDsChucVu = async () => {
    try {
        const res = await request.get('dschucvu');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addChucVu = async (chucvu) => {
    try {
        const res = await request.post('dschucvu', chucvu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const ChucVuService = {
    getDsChucVu,
    addChucVu,
};

export default ChucVuService;
