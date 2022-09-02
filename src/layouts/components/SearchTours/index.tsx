import React from 'react';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
import Search from './Search';
import Intro from './Intro';

const cx = classNames.bind(style);
const SearchTours: React.FC = () => {
    return (
        <div id={cx('search-tour-page')}>
            <div className={cx('container')}>
                {/* Intro */}
                <Intro />

                {/* Search tour */}
                <div id={cx('content')}>
                    <Search />
                </div>
            </div>
        </div>
    );
};

export default SearchTours;
