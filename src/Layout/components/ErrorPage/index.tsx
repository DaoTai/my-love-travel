import className from 'classnames/bind';
import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = className.bind(styles);

const ErrorPage: React.FC = () => {
    return (
        <div className={cx('error-page')}>
            <div className={cx('container')}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <div id={cx('wrap-dot')} className="d-flex align-items-center justify-content-center">
                    <div>.</div>
                    <div>.</div>
                    <div>.</div>
                </div>
                <div className="d-flex">
                    <Link to="/" className="d-flex inline align-items-center justify-content-center">
                        <button className="d-flex">
                            Home
                            <FontAwesomeIcon icon={faHouse} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
