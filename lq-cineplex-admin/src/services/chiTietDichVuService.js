import request from '~/util/request';

const addAllChiTietDichVu = async (dschiTietDichVu) => {
    try {
        const res = await request.post('dschitietdichvu/list', dschiTietDichVu);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

const ChiTietDichVuService = {
    addAllChiTietDichVu,
};

export default ChiTietDichVuService;
