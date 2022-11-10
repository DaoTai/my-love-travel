import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Search from './Search';
import Navigation from './Navigate';
import Actions from './Actions';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const headerRef = useRef<HTMLHeadingElement>(Object(null));
    const location = useLocation();
    useEffect(() => {
        // Change background header
        const handleChangeBackGround = () => {
            if (window.scrollY >= 10) {
                headerRef.current.classList.add(cx('default-background-header'));
            } else {
                headerRef.current.classList.remove(cx('default-background-header'));
            }
        };

        if (location.pathname === '/home' || location.pathname === '/') {
            setShowSearch(true);
            setShowNavigation(true);
            window.addEventListener('scroll', handleChangeBackGround);
        } else {
            setShowSearch(false);
            setShowNavigation(false);
            headerRef.current.classList.add(cx('default-background-header'));
        }

        return () => {
            window.removeEventListener('scroll', handleChangeBackGround);
        };
    }, [location]);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Header Layout */}
            <header ref={headerRef} id={cx('header')} className="d-flex align-items-center">
                <nav className="d-flex align-items-center justify-content-between">
                    {/* Logo */}
                    <div className={cx('logo')}>
                        <Link to="/home">
                            <LogoIcon width="4.8rem" height="4.8rem" />
                        </Link>
                    </div>

                    {!showSearch && !showNavigation && <h1 className={cx('title')}>Love Travel</h1>}

                    {/* Search */}
                    {showSearch && <Search />}

                    {/* Navigate */}
                    {showNavigation && <Navigation />}

                    {/* Actions */}
                    <Actions />
                </nav>
            </header>

            {/* Button scroll top */}
            <button
                id={cx('scroll-top-btn')}
                className="d-flex align-items-center justify-content-center"
                onClick={handleScrollTop}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </>
    );
};

export default Header;
