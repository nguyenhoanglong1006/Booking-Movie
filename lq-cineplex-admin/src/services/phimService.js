import request from '~/util/request';
import authHeader from './authHeader';

export const getDsPhim = async () => {
    try {
        const dsphim = await request.get('dsphim', { headers: authHeader() });
        return dsphim.data;
    } catch (error) {
        console.log(error);
    }
};
export const getDsPhimDangSapChieu = async () => {
    try {
        const dsphim = await request.get('dsphim/dangsapchieu');
        return dsphim.data;
    } catch (error) {
        console.log(error);
    }
};
export const addPhim = async (phim) => {
    try {
        const res = await request.post('dsphim', phim);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePhim = async (phim) => {
    try {
        const res = await request.put('dsphim', phim);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const PhimService = {
    getDsPhim,
    getDsPhimDangSapChieu,
    addPhim,
    updatePhim,
};

export default PhimService;
