import request from '~/util/request';

export const getDsPhongChieu = async () => {
    try {
        const dsphongchieu = await request.get('dsphongchieu');
        return dsphongchieu.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDsLoaiPhongChieu = async () => {
    try {
        const dsloaiphongchieu = await request.get('dsloaiphongchieu');
        return dsloaiphongchieu.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDsPhongChieuTrong = async (maRap, ngayChieu, gioBatDau, gioKetThuc) => {
    try {
        const dsphongchieu = await request.get('dsphongchieu/dsphongtrong', {
            params: { maRap: maRap, ngayChieu: ngayChieu, gioBatDau: gioBatDau, gioKetThuc: gioKetThuc },
        });
        return dsphongchieu.data;
    } catch (error) {
        console.log(error);
    }
};

export const addPhongChieu = async (phongchieu) => {
    try {
        const res = await request.post('dsphongchieu', phongchieu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updatePhongChieu = async (phongchieu) => {
    try {
        const res = await request.put('dsphongchieu', phongchieu);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const PhongChieuService = {
    getDsPhongChieu,
    getDsPhongChieuTrong,
    getDsLoaiPhongChieu,
    addPhongChieu,
    updatePhongChieu,
};

export default PhongChieuService;
