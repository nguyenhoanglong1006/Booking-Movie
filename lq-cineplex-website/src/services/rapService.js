import request from '~/utils/request';

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

const RapService = {
    getDsRap,
    getDsRapByTinhThanhPho,
};

export default RapService;
