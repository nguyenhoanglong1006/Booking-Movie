import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Ve from '~/pages/Ve';
import Phim from '~/pages/Movie';
import Rap from '~/pages/Cineplex';
import PhongChieu from '~/pages/Hall';
import Sukien from '~/pages/Events';
import Bapnuoc from '~/pages/Service';
import Lichchieu from '~/pages/Showtime';
import Datve from '~/pages/BookingTicket';
import Khachhang from '~/pages/Customers';
import Nhanvien from '~/pages/Employee';
import Login from '~/pages/Login';
import TicketBookingDetail from '~/pages/TicketBookingDetail';
import UserProfile from '~/pages/UserProfile';
import { Fragment } from 'react';
// Public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: Fragment },
    { path: config.routes.trangchu, component: Home },
    { path: config.routes.ve, component: Ve },
    { path: config.routes.phim, component: Phim },
    { path: config.routes.rap, component: Rap },
    { path: config.routes.phongchieu, component: PhongChieu },
    { path: config.routes.sukien, component: Sukien },
    { path: config.routes.bapnuoc, component: Bapnuoc },
    { path: config.routes.lichchieu, component: Lichchieu },
    { path: config.routes.datve, component: Datve },
    { path: config.routes.khachhang, component: Khachhang },
    { path: config.routes.nhanvien, component: Nhanvien },
    { path: config.routes.datvechitiet, component: TicketBookingDetail },
    { path: config.routes.userprofile, component: UserProfile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
