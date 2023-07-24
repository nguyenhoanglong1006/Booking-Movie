import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const cx = classNames.bind(styles);

const spanStyle = {
    padding: '200px',
    color: '#000000',
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px',
};
const slideImages = [
    {
        url: 'https://lqcineplex.s3.ap-southeast-1.amazonaws.com/slide_1.jpg',
    },
    {
        url: 'https://lqcineplex.s3.ap-southeast-1.amazonaws.com/slide_2.jpg',
    },
    {
        url: 'https://lqcineplex.s3.ap-southeast-1.amazonaws.com/slide_3.png',
    },
    {
        url: 'https://lqcineplex.s3.ap-southeast-1.amazonaws.com/slide_4.jpg',
    },
];

const proprietes = {
    prevArrow: (
        <button style={{ marginLeft: '15px' }}>
            <ArrowBackIosNewIcon
                fontSize="large"
                sx={{
                    fontSize: '45px',
                    color: ' #a0a3a7',
                    opacity: '.5',
                    '&:hover': {
                        color: ' #fff',
                        opacity: '1',
                    },
                }}
            />
        </button>
    ),
    nextArrow: (
        <button style={{ marginRight: '15px' }}>
            <ArrowForwardIosIcon
                sx={{
                    fontSize: '45px',
                    color: ' #a0a3a7',
                    opacity: '.5',
                    '&:hover': {
                        color: ' #fff',
                        opacity: '1',
                    },
                }}
            />
        </button>
    ),
};

function SlideHome() {
    return (
        <div className={cx('slide')}>
            <Slide {...proprietes}>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
}

export default SlideHome;
