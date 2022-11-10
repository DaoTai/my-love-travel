import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from '../styles.module.scss';
import { Tour } from '../../interface';
const cx = classNames.bind(style);

const TourInfo = ({ tour }: { tour: Tour }) => {
    return (
        <div className={cx('tour-info')}>
            <h1 className={cx('tour-name')}>{tour.name}</h1>
            <h2 className={cx('tour-place')}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{tour.place}</span>
            </h2>
            <div className={cx('tour-categories')}>
                Thể loại:
                <ul>
                    {tour.categories?.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>
            <b className={cx('tour-status')}>
                Trạng thái: <span>{tour.status}</span>
            </b>
            <p className={cx('tour-limit-amount')}>
                Số lượng tour: <span>{tour.limit}</span>
            </p>
            <p className={cx('tour-current-customers')}>
                Số hành khách hiện tại:<span>{tour.currentCustomers}</span>
            </p>
            <ul className={cx('tour-utilities')}>
                <span>Tiện ích dịch vụ:</span>
                {tour.utilities?.map((utility, i) => (
                    <li key={i}>{utility}</li>
                ))}
            </ul>
            <article className={cx('tour-intro')}>
                <span>Giới thiệu:</span> <br /> {tour.intro}
            </article>
        </div>
    );
};

export default TourInfo;
