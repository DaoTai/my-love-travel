import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from '../styles.module.scss';
const cx = classNames.bind(style);
const data = {
    id: 1,
    name: 'Penth house Đà Lạt',
    place: 'Lâm Đồng',
    price: 1350000,
    start: new Date(),
    end: new Date(),
};
const TourInfo = () => {
    return (
        <div className={cx('tour-info')}>
            <h1 className={cx('tour-name')}>{data.name}</h1>
            <h2 className={cx('tour-place')}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.place}</span>
            </h2>
            <p className={cx('tour-categories')}>
                Thể loại: <span>Nghỉ dưỡng</span>
            </p>
            <b className={cx('tour-status')}>
                Trạng thái: <span>Activing</span>
            </b>
            <p className={cx('tour-limit-amount')}>Số lượng tour: 50</p>
            <p className={cx('tour-current-customers')}>Số hành khách hiện tại: 12</p>
            <article>Giới thiệu</article>
        </div>
    );
};

export default TourInfo;
