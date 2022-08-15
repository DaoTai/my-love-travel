import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import Search from '~/components/Search';

const cx = classNames.bind(styles);
const Header = () => {
    return (
        <header id={cx('header')} className="d-flex align-items-center">
            <nav className="d-flex align-items-center justify-content-between">
                <div className={cx('logo')}>
                    <Link to="/home">
                        <LogoIcon width="4.8rem" height="4.8rem" />
                    </Link>
                </div>
                <Search />
                <ul id={cx('navigate')} className=" d-flex align-items-center">
                    <li>
                        <Link to="/search-tours">Khám phá</Link>
                    </li>
                    <li>
                        <Link to="/">Hoạt động</Link>
                    </li>
                    <li>
                        <Link to="/">Gợi ý</Link>
                    </li>
                    <li>
                        <Link to="/">Liên hệ</Link>
                    </li>
                </ul>

                <button className={cx('toggle-actions')}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </nav>
        </header>
    );
};

export default Header;
