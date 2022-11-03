import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faChartLine, faChevronRight, faLocation, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);
const Navbar = () => {
    return (
        <div id={cx('nav-bar')}>
            <nav>
                <ul>
                    <li className={cx('nav-item')}>
                        <NavLink to="/admin/chart" className={(nav: any) => cx('nav-link', { active: nav.isActive })}>
                            <FontAwesomeIcon icon={faChartLine} />
                            <span className={cx('nav-name')}>Biểu đồ</span>
                        </NavLink>
                    </li>
                    <li className={cx('nav-item')}>
                        <NavLink
                            to="/admin/account-creator"
                            className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span className={cx('nav-name')}>Tạo tài khoản</span>
                        </NavLink>
                    </li>
                    <li className={cx('nav-item')}>
                        <NavLink
                            to="/admin/manage-tours"
                            className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                        >
                            <FontAwesomeIcon icon={faLocation} />
                            <span className={cx('nav-name')}>Danh sách tour</span>
                        </NavLink>
                    </li>
                    <li className={cx('nav-item')}>
                        <NavLink
                            to="/admin/manage-users"
                            className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                        >
                            <FontAwesomeIcon icon={faUsers} />
                            <span className={cx('nav-name')}>Người dùng</span>
                            {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                        </NavLink>
                        {/* Children */}
                        {/* <div className={cx('nav-children')}>
                            <div className={cx('nav-item')}>
                                <NavLink
                                    to="/admin/manage-users"
                                    className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                                >
                                    <span className={cx('nav-name')}>Quản trị viên</span>
                                </NavLink>
                            </div>
                            <div className={cx('nav-item')}>
                                <NavLink
                                    to="/admin/manage-users"
                                    className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                                >
                                    <span className={cx('nav-name')}>Người dẫn tour</span>
                                </NavLink>
                            </div>
                        </div> */}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
