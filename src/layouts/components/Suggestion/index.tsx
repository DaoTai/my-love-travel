import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { settings, suggestions } from './config';

import styles from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

const Suggestion: React.FC = () => {
    return (
        <div id="suggestion" className={cx('suggestion')}>
            <h1> Gợi ý địa điểm từ Love Travel ✈️</h1>
            <div className={cx('wrap-suggest-tours')}>
                <Slider {...settings}>
                    {suggestions.map((suggestion, i) => (
                        <Link key={i} to={suggestion.link} className={cx('card-tour')}>
                            <div className={cx('wrap-tour-img')}>
                                <img className={cx('tour-img')} src={suggestion.image} alt="" />
                                <div className={cx('tour-link')}>
                                    <h4>
                                        Khám phá
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </h4>
                                    <div className={cx('tour-link-text')}></div>
                                </div>
                            </div>
                            <h3 className={cx('tour-name')}>{suggestion.place}</h3>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Suggestion;
