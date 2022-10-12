import { useMemo } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import InfoTour from './InfoTour';
import BookTour from './BookTour';
import CommentsTour from './CommentsTour';
import { Tour } from '../interface';
import { data as listTour } from '~/layouts/components/SearchTours/Search/FakeData';
import { settings } from './config';
import style from './styles.module.scss';
const cx = classNames.bind(style);
const DetailTour = () => {
    const { id } = useParams();

    const data: Tour | undefined = useMemo(() => {
        return listTour.find((tour) => tour.id === Number(id));
    }, [id]);
    return (
        <>
            {data && (
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
            )}
        </>
    );
};

export default DetailTour;
