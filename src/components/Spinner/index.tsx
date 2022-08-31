import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import style from './styles.module.scss';
const cx = classNames.bind(style);
const Spinner = () => {
    return (
        <div className={cx('spinner')}>
            <FontAwesomeIcon className={cx('spinner-icon')} icon={faSpinner} />
        </div>
    );
};

export default Spinner;
