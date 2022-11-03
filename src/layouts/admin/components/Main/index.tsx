import React from 'react';

import { Outlet } from 'react-router-dom';
import className from 'classnames/bind';
import { Header, Navbar } from '../index';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Admin = () => {
    return (
        <div className="admin">
            <Header />
            <div className={cx('body')}>
                <div className={cx('nav-bar')}>
                    <Navbar />
                </div>
                <div className={cx('container')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
