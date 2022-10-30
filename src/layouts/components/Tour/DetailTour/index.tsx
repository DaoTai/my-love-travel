import { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import InfoTour from './InfoTour';
import BookTour from './BookTour';
import CommentsTour from './CommentsTour';
import { Tour } from '../interface';
import { getListTour } from '../actions';
import { listTourSelector } from '../selector';
import { settings } from './config';
import style from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const cx = classNames.bind(style);
const DetailTour = () => {
    const { id } = useParams();
    const toursSelector: Array<Tour[]> = useSelector(listTourSelector);
    const dispatch = useDispatch();
    const detailTour = useMemo(() => {
        const flatTours = toursSelector.reduce((acc: Tour[], tour: Tour[]) => [...acc, ...tour], []);
        const result = flatTours.find((tour: Tour) => tour.id === Number(id));
        return result;
    }, [toursSelector]);

    useEffect(() => {
        dispatch(getListTour());
    }, []);
    return (
        <>
            {detailTour && (
                <div className="main">
                    <div className={cx('wrap-detail-tour')}>
                        <Slider {...settings}>
                            {detailTour.images?.map((image, i) => (
                                <img key={i} className={cx('tour-image')} srcSet={image} alt="Ảnh tour" />
                            ))}
                        </Slider>
                        <div className={cx('detail-tour')}>
                            <div className={cx('content-tour')}>
                                {/* Info about tour */}
                                <InfoTour tour={detailTour} />

                                {/* Book tour */}
                                <BookTour tour={detailTour} />
                            </div>
                            {/* Comments about tour */}
                            <CommentsTour />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailTour;
