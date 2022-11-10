import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { BeachIcon, ForestIcon, PagodaIcon } from '~/components/Icons';
import style from '../styles.module.scss';
const cx = classNames.bind(style);
const Intro = () => {
    return (
        <div id={cx('intro')}>
            <div className={cx('intro__content')}>
                <h1>Love Travel du hành chuyến đi cùng bạn</h1>
                <h2>Khám phá những điều mới mẻ, thú vị tại đất nước Việt Nam</h2>
                <button id={cx('receive-gift-btn')}>
                    Hộp quà ưu đãi của tháng
                    <FontAwesomeIcon icon={faGift} />
                </button>
            </div>
            <div className={cx('intro__categories')}>
                <div className={cx('wrapper')}>
                    <div className={cx('category-item')}>
                        <PagodaIcon />
                        <div className={cx('category-item__name')}>Lịch sử</div>
                        <div className={cx('category-item__amount')}></div>
                    </div>
                    <div className={cx('category-item')}>
                        <ForestIcon />
                        <div className={cx('category-item__name')}>Sinh thái</div>
                        <div className={cx('category-item__amount')}></div>
                    </div>
                    <div className={cx('category-item')}>
                        <BeachIcon />
                        <div className={cx('category-item__name')}>Nghỉ dưỡng</div>
                        <div className={cx('category-item__amount')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
