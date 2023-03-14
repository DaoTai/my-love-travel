/* eslint-disable jsx-a11y/alt-text */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import style from './styles.module.scss';
import { settings, slides } from './config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(style);

const Intro: React.FC = () => {
    const nextBtnRef = useRef<HTMLButtonElement>(Object(null));
    const sliderRef = useRef(Object(null));

    // Prev slide button
    const handlePrevTour = () => {
        sliderRef.current.slickPrev();
    };

    // Next slide button
    const handleNextTour = () => {
        sliderRef.current.slickNext();
    };

    return (
        <div id="intro">
            {/* Intro heading */}
            <div className={cx('intro__container')}>
                <h1 className={cx('intro__heading')}>Love Travel</h1>
                <button>
                    <Link to="/auth/register">Đăng ký ngay</Link>
                </button>
            </div>

            {/* Intro carousel */}
            <div id={cx('intro__carousel')}>
                {/* Button group */}
                <div className={cx('button-group')}>
                    <button onClick={handlePrevTour}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button ref={nextBtnRef} onClick={handleNextTour}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>

                <Slider ref={sliderRef} {...settings}>
                    {slides.map((slide, i) => {
                        return (
                            <div key={i} className={cx('intro__tour-content')}>
                                <div className={cx('intro__tour')}>
                                    <cite className={cx('intro__tour-quote')}>{slide.quote}</cite>
                                    <h3 className={cx('intro__tour-name')}>{slide.name}</h3>
                                    <div className={cx('intro__tour-desc')}>{slide.description}</div>
                                </div>
                                <div
                                    className={cx('intro__image')}
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                ></div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default Intro;
