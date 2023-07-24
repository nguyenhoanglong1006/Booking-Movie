import classNames from 'classnames/bind';

const cx = classNames;

function Home() {
    return (
        <div
            className={cx(
                'w-full flex flex-col items-center justify-center h-screen bg-lq-bg-home bg-no-repeat bg-cover',
            )}
        >
            <div className="text-5xl text-[#fff] pb-10"> HỆ THỐNG RẠP CHIẾU PHIM L&Q CINEPLEX</div>
            <div className="text-3xl text-[#fff]">Xin chào bạn đến trang quản trị</div>
        </div>
    );
}

<style></style>;

export default Home;
