import { useState } from 'react';
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
    const [isFavTour, setFavTour] = useState<boolean>(false);

    return (
        <Link to={`/tour/detail-tour/${tour.id}`} target="_blank" rel="noopener noreferrer" className={cx('wrap-tour')}>
            <div className={cx('tour')}>
                {/* Mark to fav tours */}
                <div>
                    <Tippy animation="fade" offset={[0, 16]} content="Thêm vào tour yêu thích" placement="top">
                        <div
                            onClick={() => setFavTour(!isFavTour)}
                            className={cx('mark-icon', {
                                active: isFavTour,
                            })}
                        >
                            <HeartIcon width="3.2rem" height="3.2rem" />
                        </div>
                    </Tippy>
                </div>
                {/* Content */}
                <img className={cx('tour__image')} src={DaLat} alt="tour-img" />
                <div className={cx('tour__content')}>
                    <h3 className={cx('tour__name')}>{tour.name}</h3>
                    <h4 className={cx('tour__place')}>{tour.place}</h4>
                    <p className={cx('tour__price')}>{tour.price}</p>
                    <p className={cx('tour__start')}>
                        Ngày khởi hành:
                        <b>
                            {tour.start.getDate()}/{tour.start.getMonth() + 1}/{tour.start.getFullYear()}
                        </b>
                    </p>
                    <p className={cx('tour__end')}>
                        Ngày kết thúc:
                        <b>
                            {tour.end.getDate()}/{tour.end.getMonth() + 1}/{tour.end.getFullYear()}
                        </b>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Tour;
