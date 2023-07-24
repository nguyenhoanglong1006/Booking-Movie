import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function CardMovieRight({ data }) {
    return (
        <>
            {data.tenPhim ? (
                <Link to={config.routes.chitiet} state={data}>
                    <div className={cx('column')}>
                        <div className={cx('card')}>
                            <img
                                src={data.poster}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                alt="movie-poster"
                                className="mx-auto"
                            />
                            <h2
                                style={{
                                    fontSize: '16px',
                                    marginTop: '15px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'clip',
                                }}
                            >
                                {data.tenPhim}
                            </h2>
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

export default CardMovieRight;
