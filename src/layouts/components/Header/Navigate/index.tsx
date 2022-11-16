import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const Navigation = () => {
    return (
        <ul id={cx('navigate')} className="d-flex">
            <li className={cx('navigate__item')}>
                <NavLink className={(nav) => cx({ active: nav.isActive })} to="/search-tours">
                    <span>Khám phá</span>
                </NavLink>
                <FontAwesomeIcon icon={faSearch} className={cx('navigate__icon')} />
            </li>
            <li className={cx('navigate__item')}>
                <a href="#events">
                    <span>Hoạt động</span>
                </a>
            </li>
            <li className={cx('navigate__item')}>
                <a href="#footer">
                    <span>Liên hệ</span>
                </a>
            </li>
        </ul>
    );
};

export default Navigation;
