import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Navigation = () => {
    return (
        <ul id={cx('navigate')} className=" d-flex align-items-center">
            <li className={cx('navigate__item')}>
                <NavLink className={(nav) => cx({ active: nav.isActive })} to="/search-tours">
                    Khám phá
                </NavLink>
            </li>
            <li className={cx('navigate__item')}>
                <a href="#events">Hoạt động</a>
            </li>
            {/* <li className={cx("navigate__item")}>
                <Link to="/">Gợi ý</Link>
            </li> */}
            <li className={cx('navigate__item')}>
                <a href="#footer">Liên hệ</a>
            </li>
        </ul>
    );
};

export default Navigation;
