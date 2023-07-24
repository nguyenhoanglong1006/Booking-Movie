import request from '~/utils/request';

const addDonDat = async (ngayDat, khachHang, tongTien) => {
    try {
        const res = await request.post('dsdondat', {
            ngayDat,
            khachHang,
            tongTien,
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

const DonDatService = {
    addDonDat,
};

export default DonDatService;
