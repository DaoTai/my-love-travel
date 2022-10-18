import { useState, memo, useRef, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { HeartIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { Tour as ITour } from './interface';
import DaLat from '~/assets/da-lat.jpg';
import 'tippy.js/dist/tippy.css';
import style from './styles.module.scss';
const cx = classNames.bind(style);

const Tour = ({ tour }: { tour: ITour }) => {
    const favRef = useRef([]);

    const [isFavTour, setFavTour] = useState<boolean>(false);
    const handleAddFavTour = (e: any) => {
        setFavTour(!isFavTour);
        e.preventDefault();
        if (Array.isArray(favRef.current)) {
            // tour.name && favRef!.current!.push(tour);
        }
    };

    useEffect(() => {
        console.log('Callback: ', favRef.current);
    }, [favRef]);

    return (
        <Link to={`/tour/detail-tour/${tour.id}`} className={cx('wrap-tour')}>
            <div className={cx('tour')}>
                {/* Mark to fav tours */}
                <div>
                    <Tippy animation="fade" offset={[0, 16]} content="Thêm vào tour yêu thích" placement="top">
                        <div
                            onClick={handleAddFavTour}
                            className={cx('mark-icon', {
                                active: isFavTour,
                            })}
                        >
                            <HeartIcon width="3.2rem" height="3.2rem" />
                        </div>
                    </Tippy>
                </div>
                {/* Content */}
                <img className={cx('tour__image')} srcSet={DaLat} alt="tour-img" onClick={(e) => e.preventDefault()} />
                <div className={cx('tour__content')}>
                    <h3 className={cx('tour__name')}>{tour.name}</h3>
                    <h4 className={cx('tour__place')}>{tour.place}</h4>
                    <p className={cx('tour__price')}>
                        {tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className={cx('tour__start')}>
                        Ngày khởi hành:
                        <b>
                            {tour.timeStart.getDate()}/{tour.timeStart.getMonth() + 1}/{tour.timeStart.getFullYear()}
                        </b>
                    </p>
                    <p className={cx('tour__end')}>
                        Ngày kết thúc:
                        <b>
                            {tour.timeEnd.getDate()}/{tour.timeEnd.getMonth() + 1}/{tour.timeEnd.getFullYear()}
                        </b>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default memo(Tour);
