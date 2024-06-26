import { ChangeEvent, memo, MouseEvent } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { HeartIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { TourProps } from './interface';
import DaLat from '~/assets/da-lat.jpg';
import 'tippy.js/dist/tippy.css';
import style from './styles.module.scss';
const cx = classNames.bind(style);

const Tour = ({ tour, onAddFavTour, favIdTours }: TourProps) => {
    const handleAddFavTour = (e: MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        onAddFavTour(tour.id);
    };

    return (
        <Link to={`/tour/detail-tour/${tour.id}`} className={cx('wrap-tour')}>
            <div className={cx('tour')}>
                {/* Mark to fav tours */}
                <div>
                    <Tippy animation="fade" offset={[0, 16]} content="Thêm vào tour yêu thích" placement="top">
                        <div
                            onClick={(e: MouseEvent<HTMLDivElement>) => handleAddFavTour(e)}
                            className={cx('mark-icon', {
                                active: favIdTours.includes(tour.id),
                            })}
                        >
                            <HeartIcon width="3.2rem" height="3.2rem" />
                        </div>
                    </Tippy>
                </div>
                {/* Content */}
                <div className={cx('tour__wrap-image')}>
                    <img
                        className={cx('tour__image')}
                        srcSet={tour.images ? tour.images[0] : DaLat}
                        alt="tour-img"
                        onClick={(e) => e.preventDefault()}
                    />
                </div>
                <div className={cx('tour__content')}>
                    <h3 className={cx('tour__name')}>{tour.name}</h3>
                    <h4 className={cx('tour__place')}>{tour.place}</h4>
                    <p className={cx('tour__price')}>
                        {tour.price && tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className={cx('tour__start')}>
                        Ngày khởi hành:
                        <b>{tour.timeStart}</b>
                    </p>
                    <p className={cx('tour__end')}>
                        Ngày kết thúc:
                        <b>{tour.timeEnd}</b>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default memo(Tour);
