import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Movie from '~/pages/Movie';
import Theater from '~/pages/Theater';
import CinemaCorner from '~/pages/CinemaCorner';
import EventCine from '~/pages/EventCine';
import TicketBooking from '~/pages/TicketBooking';
import DetailMovie from '~/pages/DetailMovie';
import ProfileUser from '~/pages/ProfileUser';

// Public routes
const publicRoutes = [
    { path: config.routes.trangchu, component: Home },
    { path: config.routes.phim, component: Movie },
    { path: config.routes.chitiet, component: DetailMovie },
    { path: config.routes.rap, component: Theater },
    { path: config.routes.gocdienanh, component: CinemaCorner },
    { path: config.routes.sukien, component: EventCine },
    { path: config.routes.datve, component: TicketBooking },
    { path: config.routes.taikhoan, component: ProfileUser },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
