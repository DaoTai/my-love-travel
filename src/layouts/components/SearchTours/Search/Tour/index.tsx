import { useState } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { HeartIcon } from '~/components/Icons';
import DaLat from '~/assets/da-lat.jpg';
import 'tippy.js/dist/tippy.css';
import style from './styles.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
const Tour = () => {
    const [isFavTour, setFavTour] = useState<boolean>(false);

    return (
        <Link to="" className={cx('wrap-tour')}>
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
                    <h3 className={cx('tour__name')}>Du lịch Bát Tràng</h3>
                    <h4 className={cx('tour__place')}>Hà Nội</h4>
                    <p className={cx('tour__price')}>500.000VND</p>
                    <p className={cx('tour__start')}>
                        Ngày khởi hành:
                        <b> 24/10/2022</b>
                    </p>
                    <p className={cx('tour__end')}>
                        Ngày kết thúc:
                        <b> 30/10/2022</b>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Tour;
