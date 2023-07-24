import request from '~/utils/request';

export const getDsVe = async () => {
    try {
        const dsve = await request.get('dsve');
        return dsve.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDsVeDonDat = async (maDonDat) => {
    try {
        const dsve = await request.get(`dsve/dondat/${maDonDat}`);
        return dsve.data;
    } catch (error) {
        console.log(error);
    }
};

const addAllVe = async (dsVe) => {
    try {
        const res = await request.post('dsve/list', dsVe);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

const VeService = {
    getDsVe,
    addAllVe,
};

export default VeService;
