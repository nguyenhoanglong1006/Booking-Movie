import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slide from '~/layouts/components/Slide';
import PropTypes from 'prop-types';
import Card from '~/layouts/components/Card';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CinemaContext } from '~/store/Context';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const cx = classNames.bind(styles);

const cardSukien = [
    {
        image: 'https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg',
    },
    {
        image: 'https://cdn.galaxycine.vn/media/2023/3/1/nta-t3-digital-300x450_1677659306345.jpg',
    },
    {
        image: 'https://cdn.galaxycine.vn/media/2023/2/16/glx-q1-1200x1800_1676516168305.jpg',
    },
    {
        image: 'https://cdn.galaxycine.vn/media/2023/1/17/bangqltv-2023-digital-1200x1800_1673940943642.jpg',
    },
];

function Home() {
    const [value, setValue] = useState(0);
    const { dsphim } = useContext(CinemaContext);

    const navigate = useNavigate();

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleXemThem = () => {
        navigate('/phim');
    };

    const renderListMovie = () => {
        return dsphim.slice(0, 8).map((item, index) => {
            return <Card key={index} data={item} />;
        });
    };
    const renderListSukien = () => {
        return cardSukien.map((item, index) => {
            return <Card key={index} data={item} />;
        });
    };

    return (
        <div className={cx('flex flex-col')}>
            <div className={cx('slide')}>
                <Slide />
            </div>

            <div className="w-full mt-4">
                <div className="w-full flex justify-center">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#C92522',
                            },
                        }}
                        sx={{
                            '& button': {
                                color: '#fff',
                                fontSize: '20px',
                                fontWeight: '500',
                            },
                            '& button.Mui-selected': { color: '#C92522' },
                        }}
                    >
                        <Tab label="Phim đang chiếu" {...a11yProps(0)} />
                        <Tab label="Phim sắp chiếu" {...a11yProps(1)} />
                    </Tabs>
                </div>
                <TabPanel value={value} index={0}>
                    <div className="flex flex-col">
                        <div>{renderListMovie()}</div>
                        <div className={cx('flex justify-end mr-2')}>
                            <Button
                                className={cx('button-more')}
                                type="button"
                                variant="outlined"
                                onClick={handleXemThem}
                                sx={{
                                    color: '#c92522',
                                    borderColor: '#c92522',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderColor: '#c92522',
                                        color: '#c92522',
                                        borderWidth: '2px',
                                    },
                                }}
                            >
                                Xem thêm <AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '25px' }} />
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Phim sắp chiếu
                </TabPanel>
            </div>

            <span className={cx('textsukien')}>Sự kiện</span>
            <div className={cx('mx-4')}>{renderListSukien()}</div>
        </div>
    );
}

export default Home;
