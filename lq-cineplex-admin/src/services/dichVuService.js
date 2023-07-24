import request from '~/util/request';

export async function getDsDichVu() {
    try {
        const res = await request.get('dsdichvu');
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getDsLoaiDichVu() {
    try {
        const res = await request.get('dsloaidichvu');
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const addDichVu = async (dichvu) => {
    try {
        const res = await request.post('dsdichvu', dichvu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateDichVu = async (dichvu) => {
    try {
        const res = await request.put('dsdichvu', dichvu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
const DichVuService = {
    getDsDichVu,
    getDsLoaiDichVu,
    addDichVu,
    updateDichVu,
};

export default DichVuService;
