import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { LogoIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
const Search: React.FC = () => {
    return (
        <HeadlessTippy
            interactive
            visible
            render={(attrs) => (
                <div className={cx('search-result')} {...attrs}>
                    <div id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </div>
                    <div id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </div>
                    <div id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </div>
                </div>
            )}
        >
            <div className={cx('wrap-search-input')}>
                <input type="search" name="" id={cx('search-input')} placeholder="Search..." />
                <button id={cx('icon-search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
