import request from '~/utils/request';

export const getDsPhim = async () => {
    try {
        const dsphim = await request.get('dsphim');
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

const PhimService = {
    getDsPhim,
    getDsPhimDangSapChieu,
};

export default PhimService;
