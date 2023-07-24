import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BsFacebook, BsGithub, BsYoutube } from 'react-icons/bs';
import logo from '~/layouts/asset/logo.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('bg-[#0d0e13]')}>
            <div className={cx('flex')} style={{ justifyContent: 'space-between', padding: '20px' }}>
                {/* logo */}
                <div className={cx('flex items-center pl-10')}>
                    <a href="/">
                        <img
                            src={logo}
                            className={cx('object-contain')}
                            alt="logo-cineplex"
                            style={{ height: '150px' }}
                        />
                    </a>
                </div>
                {/* gioi thieu */}
                <div>
                    <p className={cx(' text-3xl text-white font-normal mb-2')}>Giới thiệu</p>

                    <a className={cx('flex text-xl items-center', 'item-footer')} href="/">
                        <AiOutlineDoubleRight className={cx('mr-1')} />
                        Về công ty
                    </a>

                    <a className={cx('flex text-xl items-center', 'item-footer')} href="/">
                        <AiOutlineDoubleRight className={cx('mr-1')} />
                        Về quy chế
                    </a>

                    <a className={cx('flex text-xl items-center', 'item-footer')} href="/">
                        <AiOutlineDoubleRight className={cx('mr-1')} />
                        Về chính sách bảo mật
                    </a>
                </div>
                {/* ho tro */}
                <div>
                    <p className={cx('text-3xl text-white font-normal mb-2')}>Hỗ trợ</p>

                    <a className={cx('flex text-xl items-center', 'item-footer')} href="/">
                        <AiOutlineDoubleRight className={cx('mr-1')} />
                        Đăng ký tài khoản
                    </a>

                    <a className={cx('flex text-xl items-center', 'item-footer')} href="/">
                        <AiOutlineDoubleRight className={cx('mr-1')} />
                        Về rạp / Giá vé
                    </a>
                </div>
                {/* Ket Noi */}
                <div className="pr-10">
                    <p className={cx('text-3xl text-white font-normal mb-3')}>Kết nối</p>
                    <div className={cx('flex flex-col')}>
                        <div className="flex">
                            {/* facebook */}
                            <a href="/" style={{ fontSize: '40px', color: '#0080ff' }}>
                                <BsFacebook />
                            </a>
                            {/* Github */}
                            <a
                                className="ml-8"
                                href="https://github.com/quanNguyen0872/lq-cineplex-website"
                                style={{ fontSize: '40px', color: '#ffffff' }}
                            >
                                <BsGithub />
                            </a>
                        </div>
                        {/* Youtube */}
                        <a
                            className={cx('pt-3 flex justify-center')}
                            href="/"
                            style={{ fontSize: '40px', color: '#C92522' }}
                        >
                            <BsYoutube />
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx('w-full h-1 bg-[#221f1f]')}></div>
            {/* Dia chi */}
            <div className={cx('flex bg-[#0d0e13] h-14 pt-3 text-white text-xl')}>
                <a
                    className={cx('text-red-600')}
                    href="/"
                    style={{ fontSize: '24px', color: '#C92522', marginLeft: '10px', marginRight: '10px' }}
                >
                    <FaMapMarkerAlt />
                </a>
                12 Nguyễn Văn Bảo - phường 4 - Gò Vấp - TP Hồ Chí Minh
            </div>
        </div>
    );
}

export default Footer;
