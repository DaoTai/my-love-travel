import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faChartLine, faLocation, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);
const Navbar = () => {
    return (
        <div id={cx('nav-bar')}>
            <nav>
                <ul>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/chart" className={cx('nav-link', 'active')}>
                            <FontAwesomeIcon icon={faChartLine} />
                            <span className={cx('nav-name')}>Biểu đồ</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/account-creator" className={cx('nav-link')}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span className={cx('nav-name')}>Tạo tài khoản</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/manage-tours" className={cx('nav-link')}>
                            <FontAwesomeIcon icon={faLocation} />
                            <span className={cx('nav-name')}>Danh sách tour</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/manage-users" className={cx('nav-link')}>
                            <FontAwesomeIcon icon={faUsers} />
                            <span className={cx('nav-name')}>Người dùng</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
