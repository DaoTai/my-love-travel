import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Search from './Search';
import Navigation from './Navigate';
import Actions from './Actions';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    const headerRef = useRef<HTMLHeadingElement>(Object(null));
    useEffect(() => {
        const handleChangeBackGround = () => {
            if (window.scrollY >= 10) {
                headerRef.current.classList.add(cx('default-background-header'));
            } else {
                headerRef.current.classList.remove(cx('default-background-header'));
            }
        };

        window.addEventListener('scroll', handleChangeBackGround);

        return () => {
            window.removeEventListener('scroll', handleChangeBackGround);
        };
    }, []);

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

                    {/* Search */}
                    <Search />

                    {/* Navigate */}
                    <Navigation />

                    {/* Actions */}
                    <Actions />
                </nav>
            </header>

            {/* Button scroll top */}
            <a href="#" id={cx('scroll-top-btn')} className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faArrowUp} />
            </a>
        </>
    );
};

export default Header;
