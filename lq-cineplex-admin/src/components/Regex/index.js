export const checkStringUTF8 = (string) => {
    var text = string.trim();
    if (
        !text.match(
            /^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        )
    )
        return false;
    return true;
};

export const checkKhacRong = (value) => {
    if (!!value) {
        let array = [];
        if (typeof value === 'string') {
            let txt = value.trim();
            if (txt.length > 0) {
                return true;
            }
        } else if (typeof value === typeof array) {
            if (value.length <= 0) {
                return false;
            } else return true;
        }
        return true;
    }
    return false;
};
export const checkChuaSo = (value) => {
    let txt = value.trim();
    if (txt.match(/^\D*$/)) {
        return true;
    } else return false;
};

export const checkEmail = (value) => {
    let txt = value.trim();
    if (txt.match(/^[a-z0-9\.]+@[a-z\.]+$/)) {
        return true;
    } else return false;
};
export const checkPhone = (value) => {
    let txt = value.trim();
    if (txt.match(/^0[0-9 ]{9,10}$/)) {
        return true;
    } else return false;
};

export const compareDate = (_dateAfter, _dateBefore) => {
    let dateBefore = new Date(_dateBefore);
    let dateAfter = new Date(_dateAfter);
    if (dateAfter >= dateBefore) {
        return true;
    } else return false;
};
