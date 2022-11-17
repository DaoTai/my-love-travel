import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import className from 'classnames/bind';
import { Header, Navbar } from '../../components';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Admin = () => {
    const [showNavbav, setShowNavbar] = useState<boolean>(true);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbav);
    };
    return (
        <div className="admin">
            <Header setShowNavbar={handleShowNavbar} />
            <div className={cx('body')}>
                {showNavbav && (
                    <div className={cx('nav-bar')}>
                        <Navbar />
                    </div>
                )}
                <div className={cx('container')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
