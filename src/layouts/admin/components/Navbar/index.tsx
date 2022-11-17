import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import {
    faChartLine,
    faChevronRight,
    faLocation,
    faPlusCircle,
    faUserPlus,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);
const Navbar = () => {
    const [showCreations, setShowCreations] = useState<boolean>(false);
    return (
        <div id={cx('nav-bar')}>
            <nav>
                <ul>
                    <li className={cx('nav-item')}>
                        <NavLink
                            to="/admin/statistical"
                            className={(nav: any) => cx('nav-link', { active: nav.isActive })}
                        >
                            <FontAwesomeIcon icon={faChartLine} />
                            <span className={cx('nav-name')}>Thống kê</span>
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
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
