import request from '~/util/request';

export async function getDsGheMaPhongChieu(maPhongChieu) {
    if (maPhongChieu) {
        try {
            const res = await request.get(`dsghe/maphongchieu/${maPhongChieu}`);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}

export async function getDsGheDaBan(maLichChieu) {
    if (maLichChieu) {
        try {
            const res = await request.get(`dsghe/malichchieu/${maLichChieu}`);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}

export const addGheToPhongChieu = async (maPhongChieu) => {
    try {
        const res = await request.post(`dsghe/loaighe/1/phongchieu/${maPhongChieu}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const GheService = {
    getDsGheDaBan,
    getDsGheMaPhongChieu,
    addGheToPhongChieu,
};

export default GheService;
