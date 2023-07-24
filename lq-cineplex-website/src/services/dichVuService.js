import request from '~/utils/request';

export async function getDsDichVu() {
    try {
        const res = await request.get('dsdichvu');
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

const DichVuService = {
    getDsDichVu,
};

export default DichVuService;
