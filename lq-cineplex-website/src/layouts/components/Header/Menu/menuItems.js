import config from '~/config';
export const menuItems = [
    {
        title: 'Trang chủ',
        to: config.routes.trangchu,
    },
    {
        title: 'Phim',
        to: config.routes.phim,
        submenu: [
            {
                title: 'Phim đang chiếu',
                to: config.routes.phim,
            },
            {
                title: 'Phim sắp chiếu',
                to: config.routes.phim,
            },
        ],
    },
    {
        title: 'Rạp',
        to: config.routes.rap,
    },
    // {
    //     title: 'Sự kiện',
    //     to: config.routes.sukien,
    //     submenu: [
    //         {
    //             title: 'Ưu đãi',
    //             to: '#',
    //         },
    //         {
    //             title: 'Phim hay tháng',
    //             to: '#',
    //         },
    //     ],
    // },
    // {
    //     title: 'Góc điện ảnh',
    //     to: config.routes.gocdienanh,
    //     submenu: [
    //         {
    //             title: 'Diễn viên',
    //             to: '#',
    //         },
    //         {
    //             title: 'Đạo diễn',
    //             to: '#',
    //         },
    //         {
    //             title: 'Blog điện ảnh',
    //             to: '#',
    //         },
    //     ],
    // },
];
