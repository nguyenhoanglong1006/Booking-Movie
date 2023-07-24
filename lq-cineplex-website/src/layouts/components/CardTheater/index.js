import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function CardTheater({ data }) {
    return (
        <>
            {data.tenRap ? (
 
                <Link to={config.routes.rap} state={data}>
 
                    <div className={cx('column')}>
                        <div className={cx('card')}>
                            <h2>{data.tenRap}</h2>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link to={'#'}>
                    <div className={cx('column')}>
                        <div className={cx('card')}>
                            <img
                                src={data.image}
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                alt="movie-poster"
                            />
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}

export default CardTheater;
