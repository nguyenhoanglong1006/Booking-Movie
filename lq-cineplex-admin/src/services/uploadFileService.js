import request from '~/util/request';

export const uploadFile = async (file) => {
    try {
        const res = await request.post('uploadFile', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const UploadFileService = {
    uploadFile,
};

export default UploadFileService;
