import { useMemo } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import InfoTour from './InfoTour';
import BookTour from './BookTour';
import CommentsTour from './CommentsTour';
import { Tour } from '../interface';
import { tours } from '~/data';
import { settings } from './config';
import style from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const cx = classNames.bind(style);
const DetailTour = () => {
    const { id } = useParams();

    const data: Tour | undefined = useMemo(() => {
        return tours[0].find((tour) => tour.id === Number(id));
    }, [id]);
    return (
        <>
            {data && (
                <div className="main">
                    <div className={cx('wrap-detail-tour')}>
                        <Slider {...settings}>
                            {data.images?.map((image, i) => (
                                <img key={i} className={cx('tour-image')} srcSet={image} alt="Ảnh tour" />
                            ))}
                        </Slider>
                        <div className={cx('detail-tour')}>
                            <div className={cx('content-tour')}>
                                {/* Info about tour */}
                                <InfoTour tour={data} />

                                {/* Book tour */}
                                <BookTour tour={data} />
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
