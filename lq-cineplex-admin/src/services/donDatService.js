import request from '~/util/request';

const addDonDat = async (ngayDat, nhanVien, tongTien) => {
    try {
        const res = await request.post('dsdondat', {
            ngayDat,
            nhanVien,
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
