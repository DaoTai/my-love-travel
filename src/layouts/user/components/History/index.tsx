import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
const cx = className.bind(styles);
function History() {
    return (
        <div className="main">
            <div className={cx('container')}>
                <div className={cx('wrap-history')}>
                    <div className={cx('history-bill-item')}>
                        <div className={cx('bill-icon')}>
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </div>
                        <div className={cx('bill-text')}>
                            <h3 className={cx('bill-time')}>Thời gian giao dịch: 9h45 1/11/2022</h3>
                            <div className={cx('bill-content')}>
                                <label>Trạng thái: Đặt tour</label>
                                <p>Tên tour: Nha Trang</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('history-bill-item')}>
                        <div className={cx('bill-icon')}>
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </div>
                        <div className={cx('bill-text')}>
                            <h3 className={cx('bill-time')}>9h45 1/11/2022</h3>
                            <div className={cx('bill-content')}>
                                <label>Đặt tour</label>
                                <p>Nha Trang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
