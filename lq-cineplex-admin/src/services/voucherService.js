import request from '~/util/request';

export const getDsVoucher = async () => {
    try {
        const dsvoucher = await request.get('dsvoucher');
        return dsvoucher.data;
    } catch (error) {
        console.log(error);
    }
};

export const addVoucher = async (voucher) => {
    try {
        const res = await request.post('dsvoucher', voucher);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateVoucher = async (voucher) => {
    try {
        const res = await request.put('dsvoucher', voucher);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const PhimService = {
    getDsVoucher,
    addVoucher,
    updateVoucher,
};

export default PhimService;
