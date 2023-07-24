import request from '~/util/request';

export const getDsLichChieu = async () => {
    try {
        const dslichchieu = await request.get('dslichchieu');
        return dslichchieu.data;
    } catch (error) {
        console.log(error);
    }
};
export const addLichChieu = async (lichChieu) => {
    try {
        const res = await request.post('dslichchieu', lichChieu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const LichChieuService = {
    getDsLichChieu,
    addLichChieu,
};

export default LichChieuService;
