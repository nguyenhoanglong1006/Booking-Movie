import request from '~/utils/request';

export const getDsLichChieu = async () => {
    try {
        const dslichchieu = await request.get('dslichchieu');
        return dslichchieu.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDsLichChieuPhimRapNgayChieu = async (maPhim, maRap, ngayChieu) => {
    try {
        const dslichchieu = await request.get('dslichchieu/maPhim/maRap/ngayChieu', {
            params: { maPhim: maPhim, maRap: maRap, ngayChieu: ngayChieu },
        });
        return dslichchieu.data;
    } catch (error) {
        console.log(error);
    }
};

const LichChieuService = {
    getDsLichChieu,
    getDsLichChieuPhimRapNgayChieu,
};

export default LichChieuService;
