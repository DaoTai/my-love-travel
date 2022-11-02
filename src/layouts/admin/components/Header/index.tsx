import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './styles.module.scss';
import { LogoIcon } from '~/components/Icons';
const cx = className.bind(styles);
const Header = () => {
    return (
        <div className={cx('header')}>
            <nav className="d-flex justify-content-between align-items-center">
                <div className={cx('logo')}>
                    <Link to="/admin">
                        <LogoIcon width="4.8rem" height="4.8rem" />
                    </Link>
                </div>
                <h1 className={cx('title')}>Love Travel</h1>
                <div className={cx('wrap-btns')}>
                    <Link to="/auth/login">Đăng xuất</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;
