 
import styles from './Theater.module.scss';
 
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import raphim from '~/layouts/asset/raphim.png';
import { CinemaContext } from '~/store/Context';
import CardTheater from '~/layouts/components/CardTheater';
const cx = classNames.bind(styles);

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

function Theater() {
    const [value] = useState(0);
    const { dsRap } = useContext(CinemaContext);

    const renderListTheater = () => {
        return dsRap.map((item, index) => {
            return <CardTheater key={index} data={item} />;
        });
    };

    return (
        <div className={cx('flex flex-col ml-10 mr-10')}>
            <div className="w-full mt-4 ">
                <div className={cx('w-full flex justify-center text-white pb-3')}>
                    <h1>RẠP CHIẾU PHIM</h1>
                </div>

                <TabPanel value={value} index={0}>
                    <div className="flex flex-col">
                        <div>{renderListTheater()}</div>
                    </div>
                </TabPanel>

                <div className={cx('posterrap')}>
 
                    <img src={raphim} alt="img-rap" />
 
                </div>
            </div>
        </div>
    );
}

export default Theater;
