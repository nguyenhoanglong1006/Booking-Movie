import { useContext } from 'react';
import { CinemaContext } from '~/store/Context';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { Button } from '@mui/material';
import moment from 'moment';
import vi from 'moment/locale/vi';

const cx = classNames.bind(styles);

function UserProfile() {
    const { user } = useContext(CinemaContext);

    const userProfile = user
        ? user
        : { avatar: '', ten: '', chucVu: { tenChucVu: '' }, diaChi: { phuongXa: '', quanHuyen: '', tinhThanhPho: '' } };

    return (
        <div className={cx('wrapper-profile')}>
            <div className={cx('profile')}>
                <img src={userProfile.avatar} alt="avatar" className={cx('avatar')} />
                <div className={cx('name')}>{userProfile.ten}</div>
                <div className={cx('mt-3')}>
                    <Button variant="contained" className={cx('mx-4')} color="error">
                        Sửa thông tin
                    </Button>
                    <Button variant="contained" className={cx('mx-4')} color="error">
                        Đổi mật khẩu
                    </Button>
                </div>
                <div className={cx('profile-info')}>
                    <div className={cx('info-left')}>
                        <div>Mã nhân viên: {userProfile.id}</div>
                        <div>Tên nhân viên: {userProfile.ten}</div>
                        <div>Ngày sinh: {moment(userProfile.ngaySinh).locale('vi', vi).format('DD/MM/YYYY')}</div>
                        <div>Giới tính: {userProfile.gioiTinh}</div>
                        <div>Điện thoại: {userProfile.dienThoai}</div>
                    </div>
                    <div className={cx('info-right')}>
                        <div>Email: {userProfile.email}</div>
                        <div>Chức vụ: {userProfile.chucVu.tenChucVu}</div>
                        <div>
                            Địa chỉ:{' '}
                            {userProfile.diaChi.phuongXa +
                                ', ' +
                                userProfile.diaChi.quanHuyen +
                                ', ' +
                                userProfile.diaChi.tinhThanhPho}
                        </div>
                        <div>
                            Trạng thái: <span className={cx('text-green-500')}>{userProfile.trangThai}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
