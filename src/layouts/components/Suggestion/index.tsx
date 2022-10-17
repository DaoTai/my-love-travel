import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import background from '~/assets/background-suggestion.jpg';
const cx = classNames.bind(styles);

const Suggestion: React.FC = () => {
    return (
        <div id="suggestion" className={cx('suggestion')}>
            <h1> Gợi ý địa điểm từ Love Travel ✈️</h1>
            <div className={cx('wrap-suggest-tours')}>
                <Slider {...settings}>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/06/du-lich-da-lat-ivivu-1.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Đà Lạt</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/07/h%E1%BB%93-g%C6%B0%C6%A1m-du-l%E1%BB%8Bch-H%C3%A0-N%E1%BB%99i-ivivu.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Hà Nội</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img className={cx('tour-img')} src={background} alt="" />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Tràng An</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/06/du-lich-da-lat-ivivu-1.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Đà Lạt</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/06/du-lich-da-lat-ivivu-1.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Đà Lạt</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/06/du-lich-da-lat-ivivu-1.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Đà Lạt</h3>
                    </div>
                    <div className={cx('card-tour')}>
                        <div className={cx('wrap-tour-img')}>
                            <img
                                className={cx('tour-img')}
                                src="https://cdn3.ivivu.com/2022/06/du-lich-da-lat-ivivu-1.jpg"
                                alt=""
                            />
                            <div className={cx('tour-link')}>
                                <h4>
                                    Khám phá
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </h4>
                                <div className={cx('tour-link-text')}></div>
                            </div>
                        </div>
                        <h3 className={cx('tour-name')}>Đà Lạt</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Suggestion;
