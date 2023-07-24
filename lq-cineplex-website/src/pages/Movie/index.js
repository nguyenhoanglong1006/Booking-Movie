import Card from '~/layouts/components/Card';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { CinemaContext } from '~/store/Context';

const cx = classNames;

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

function Movie() {
    const [value, setValue] = useState(0);
    const { dsphim } = useContext(CinemaContext);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const renderListMovie = () => {
        return dsphim.map((item, index) => {
            return <Card key={index} data={item} />;
        });
    };

    return (
        <div className={cx('flex flex-col')}>
            <div className="w-full mt-4">
                <div className="w-full px-10">
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
                                borderBottom: '1px solid',
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
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Phim sắp chiếu
                </TabPanel>
            </div>
        </div>
    );
}

export default Movie;
