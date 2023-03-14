import { useEffect, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { settings } from './config';
import { SuggestionProps } from './interface';
import { Tour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/Tour/actions';
import { listTourSelector as storeListTour } from '~/layouts/components/Tour/selector';
import styles from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

const Suggestion: React.FC = () => {
    const listTourSelector: Array<Tour[]> = useSelector(storeListTour);
    const sliderRef = useRef(Object(null));
    const dispatch = useDispatch();
    // Get suggest tour
    const suggestedTours = useMemo(() => {
        const flatTours = listTourSelector?.reduce((acc: Tour[], tours: Tour[]) => [...acc, ...tours], []);
        const suggestTours: Tour[] = flatTours.filter((tour: Tour, i: number) => {
            return i < 10;
        });
        const result: SuggestionProps[] = suggestTours.map((tour: Tour) => {
            return {
                image: tour.images[0],
                place: tour.place,
                link: `/tour/detail-tour/${tour.id}`,
            };
        });
        return result;
    }, [listTourSelector]);

    useEffect(() => {
        dispatch(getListTour());
    }, []);
    return (
        <div id={cx('suggestion')}>
            <h1> Gợi ý địa điểm từ Love Travel ✈️</h1>
            <div className={cx('wrap-suggest-tours')}>
                <Slider ref={sliderRef} {...settings}>
                    {suggestedTours.map((suggestion, i) => (
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
                <div id={cx('btn-prev')} className={cx('btn-control')} onClick={() => sliderRef.current.slickPrev()}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div id={cx('btn-next')} className={cx('btn-control')} onClick={() => sliderRef.current.slickNext()}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
