import request from '~/util/request';

export const getDsDaoDien = async () => {
    try {
        const res = await request.get('dsdaodien');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addDaoDien = async (daoDien) => {
    try {
        const res = await request.post('dsdaodien', daoDien);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const DaoDienService = {
    getDsDaoDien,
    addDaoDien,
};

export default DaoDienService;
