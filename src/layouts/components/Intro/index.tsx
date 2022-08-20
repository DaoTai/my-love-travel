import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import style from './styles.module.scss';
import slide1 from '~/assets/da-lat.jpg';
import slide2 from '~/assets/ha-noi.jpg';
import slide3 from '~/assets/phu-quoc.jpg';

const cx = classNames.bind(style);

enum SHOW {
    FIRST,
    SECOND,
    LAST,
}

const Intro = () => {
    const [currentTour, setCurrentTour] = useState<SHOW>(0);
    const tourRef = useRef<HTMLHeadingElement>(Object(null));

    const renderTour: Record<SHOW, React.ReactNode> = {
        [SHOW.FIRST]: (
            <div ref={tourRef} className={cx('intro__tour-content')}>
                <div
                    className={cx('intro__image')}
                    style={{
                        backgroundImage: `url(${slide1})`,
                    }}
                ></div>
                <div className={cx('intro__tour')}>
                    <cite className={cx('intro__tour-quote')}>"Chốn thiên đàng mộng mơ giữa trần gian"</cite>
                    <h3 className={cx('intro__tour-name')}>Đà Lạt</h3>
                    <details>
                        <summary></summary>
                        <div className={cx('intro__tour-desc')}>
                            Đà Lạt là thành phố trực thuộc tỉnh Lâm Đồng, nằm trên cao nguyên Lâm Viên, thuộc vùng Tây
                            Nguyên, Việt Nam. Vùng đất thơ mộng luôn là điểm đến thú vị của các bạn trẻ.
                        </div>
                    </details>
                </div>
            </div>
        ),
        [SHOW.SECOND]: (
            <div ref={tourRef} className={cx('intro__tour-content')}>
                <div
                    className={cx('intro__image')}
                    style={{
                        backgroundImage: `url(${slide2})`,
                    }}
                ></div>
                <div className={cx('intro__tour')}>
                    <cite className={cx('intro__tour-quote')}>"Hồ Gươm trăm năm cổ kính"</cite>
                    <h3 className={cx('intro__tour-name')}>Hà Nội</h3>
                    <details>
                        <summary></summary>
                        <div className={cx('intro__tour-desc')}>
                            Hà Nội là thủ đô của Việt Nam. Nơi đã lưu lại nhiều nốt thăng trầm của lịch sử và giữ gìn
                            những di tích lịch sử cổ kính, trang nghiêm cùng những nét văn hoá đường phố thú vị.
                        </div>
                    </details>
                </div>
            </div>
        ),
        [SHOW.LAST]: (
            <div ref={tourRef} className={cx('intro__tour-content')}>
                <div
                    className={cx('intro__image')}
                    style={{
                        backgroundImage: `url(${slide3})`,
                    }}
                ></div>
                <div className={cx('intro__tour')}>
                    <cite className={cx('intro__tour-quote')}>"Hòn ngọc xanh của nhân loại"</cite>
                    <h3 className={cx('intro__tour-name')}>Phú Quốc</h3>
                    <details>
                        <summary></summary>
                        <div className={cx('intro__tour-desc')}>
                            Phú Quốc là một hòn đảo nằm trong vịnh Thái Lan và là đảo lớn nhất Việt Nam, sở hữu vẻ đẹp
                            hoang sơ, bãi biển xanh, rất thích hợp với những chuyến nghỉ dưỡng, vui chơi.
                        </div>
                    </details>
                </div>
            </div>
        ),
    };

    const handlePrevTour = () => {
        tourRef.current.classList.add(cx('fade'));
        setCurrentTour((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return SHOW.LAST;
        });
        setTimeout(() => {
            tourRef.current.classList.remove(cx('fade'));
        }, 800);
    };

    const handleNextTour = () => {
        tourRef.current.classList.add(cx('fade'));
        setCurrentTour((prev) => {
            if (prev === SHOW.LAST) {
                return 0;
            }
            return prev + 1;
        });
        setTimeout(() => {
            tourRef.current.classList.remove(cx('fade'));
        }, 800);
    };

    useEffect(() => {
        // tourRef.current.classList.add(cx('fade'));
    }, [tourRef]);

    return (
        <div id="intro">
            {/* Intro heading */}
            <div className={cx('intro__container')}>
                <h1 className={cx('intro__heading')}>
                    Love Travel
                    {/* <div>Website đặt tour du lịch số 1 Việt Nam</div> */}
                </h1>
                <button>
                    <Link to="/">Đăng ký ngay</Link>
                </button>
            </div>

            {/* Intro carousel */}
            <div id={cx('intro__carousel')}>
                {renderTour[currentTour]}

                {/* Button group */}
                <div className={cx('button-group')}>
                    <button onClick={handlePrevTour}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button onClick={handleNextTour}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
