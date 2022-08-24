import React from 'react';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
const cx = classNames.bind(style);
const SearchTours: React.FC = () => {
    return (
        <div id={cx('search-tour-page')}>
            <div className={cx('container')}></div>
        </div>
    );
};

export default SearchTours;
