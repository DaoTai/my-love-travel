import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

const Navigation = () => {
    return (
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
    );
};

export default Navigation;
