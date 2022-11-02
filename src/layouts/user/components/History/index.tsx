import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { historySelector } from './selector';
import { PrivateBill } from './interface';
import { getPrivateBills } from './actions';
import styles from './styles.module.scss';
const cx = className.bind(styles);
function History() {
    const privateBills: [] = useSelector(historySelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPrivateBills());
    }, []);
    return (
        <div className="main">
            <div className={cx('container')}>
                <div className={cx('wrap-history')}>
                    {privateBills?.map((bill: PrivateBill) => {
                        const dateFormat =
                            bill?.date.getUTCDate() +
                            '/' +
                            (Number(bill?.date.getUTCMonth()) + 1) +
                            '/' +
                            bill?.date.getUTCFullYear();
                        return (
                            <div key={bill.id} className={cx('history-bill-item')}>
                                <div
                                    className={cx('bill-icon', {
                                        booked: bill.status === 'Đặt tour',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                                <div className={cx('bill-text')}>
                                    <h3 className={cx('bill-time')}>Thời gian giao dịch: {dateFormat}</h3>
                                    <div className={cx('bill-content')}>
                                        <p className={cx('bill-status')}>
                                            Trạng thái: <b>{bill.status}</b>
                                        </p>
                                        <p>
                                            Tour:{' '}
                                            <Link
                                                to={`/tour/detail-tour/${bill.idTour}`}
                                                className={cx('bill-name-tour')}
                                            >
                                                {bill.nameTour}
                                            </Link>
                                        </p>
                                        <p>
                                            Số tiền giao dịch:{' '}
                                            <span
                                                className={cx('bill-total', {
                                                    booked: bill.status === 'Đặt tour',
                                                })}
                                            >
                                                {bill.total?.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default History;
