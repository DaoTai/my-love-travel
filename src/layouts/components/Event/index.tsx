import React from 'react';
import className from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
const cx = className.bind(styles);
const Event: React.FC = () => {
    return (
        <div id="events" className={cx('event')}>
            <h1>Sự kiện và ưu đãi dành riêng cho bạn</h1>
            <h3>
                Nhanh tay <Link to="/auth/register"> Đăng ký </Link> để nhận những món quà đặc biệt
            </h3>
            <div id={cx('wrapper')} className="d-flex justify-content-space-between">
                <Link to="/" className={cx('event-item')}>
                    <h2>Giảm giá 10-20% các dịp đặc biệt</h2>
                </Link>
                <Link to="/" className={cx('event-item')}>
                    <h2>Nhận hộp quà đặc biệt từ Love Travel 🎁</h2>
                </Link>
                <Link to="/" className={cx('event-item')}>
                    <h2>Sự kiện của tháng cùng bạn đồng hành </h2>
                </Link>
            </div>
        </div>
    );
};

export default Event;
