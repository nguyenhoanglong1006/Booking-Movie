import request from '~/util/request';

export const getDsRap = async () => {
    try {
        const dsrap = await request.get('dsrap');
        return dsrap.data;
    } catch (error) {
        console.log(error);
    }
};
export const getDsRapByTinhThanhPho = async (value) => {
    try {
        const dsrap = await request.get('dsrap', { params: { tinhThanhPho: value } });
        return dsrap.data;
    } catch (error) {
        console.log(error);
    }
};
export const addRap = async (rap) => {
    try {
        const res = await request.post('dsrap', rap);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateRap = async (rap) => {
    try {
        const res = await request.put('dsrap', rap);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const RapService = {
    getDsRap,
    getDsRapByTinhThanhPho,
    addRap,
    updateRap,
};

export default RapService;
