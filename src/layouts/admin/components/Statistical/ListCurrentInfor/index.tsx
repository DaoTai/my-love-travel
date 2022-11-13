import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ListCurrentInfor = () => {
    return (
        <div id={cx('list-current-infor')}>
            <h3>Tháng hiện tại</h3>
            <div className={cx('content')}>
                <div className={cx('current-infor')}>
                    <h4 className={cx('infor__heading')}>Doanh thu</h4>
                    <div className={cx('infor__desc')}>
                        <b className={cx('infor__progress-percent')}>
                            <div className={cx('infor__icon', 'infor__icon--up')}>
                                <FontAwesomeIcon icon={faChevronCircleUp} />
                            </div>
                            123 <span>%</span>
                        </b>
                        <div className={cx('infor__data')}>50000000VND</div>
                    </div>
                </div>
                <div className={cx('current-infor')}>
                    <h4 className={cx('infor__heading')}>Tour trong tháng</h4>
                    <div className={cx('infor__desc')}>
                        <b className={cx('infor__progress-percent')}>
                            <div className={cx('infor__icon', 'infor__icon--up')}>
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            123 <span>%</span>
                        </b>
                        <div className={cx('infor__data')}>50</div>
                    </div>
                </div>
                <div className={cx('current-infor')}>
                    <h4 className={cx('infor__heading')}>Tour hôm nay</h4>
                    <div className={cx('infor__desc')}>
                        <b className={cx('infor__progress-percent')}>
                            <div className={cx('infor__icon', 'infor__icon--down')}>
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            123 <span>%</span>
                        </b>
                        <div className={cx('infor__data')}>50</div>
                    </div>
                </div>
                <div className={cx('current-infor')}>
                    <h4 className={cx('infor__heading')}>Người dùng</h4>
                    <div className={cx('infor__desc')}>
                        <b className={cx('infor__progress-percent')}>
                            <div className={cx('infor__icon', 'infor__icon--up')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            123 <span>%</span>
                        </b>
                        <div className={cx('infor__data')}>50</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCurrentInfor;
