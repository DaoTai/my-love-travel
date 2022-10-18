import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { events } from './config';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Event: React.FC = () => {
    return (
        <div id="events" className={cx('event')}>
            <h1>Sự kiện và ưu đãi dành riêng cho bạn</h1>
            <h3>
                Nhanh tay <Link to="/auth/register"> Đăng ký </Link> để nhận những món quà đặc biệt
            </h3>
            <div id={cx('wrapper')} className="d-flex justify-content-space-between">
                {events.map((event, i) => (
                    <Link key={i} to={event.link} className={cx('event-item')}>
                        <h2>{event.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Event;
