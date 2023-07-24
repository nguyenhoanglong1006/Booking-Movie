import request from '~/utils/request';

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

const GheService = {
    getDsGheDaBan,
    getDsGheMaPhongChieu,
};

export default GheService;
