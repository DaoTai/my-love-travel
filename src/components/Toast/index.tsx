import { memo, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faInfo, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastData } from './interface';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export enum STATUS_ICON {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
}

export const Status: Record<STATUS_ICON, Object> = {
    [STATUS_ICON.SUCCESS]: (
        <span className={cx('icon-status--success')}>
            <FontAwesomeIcon icon={faCheck} />
        </span>
    ),
    [STATUS_ICON.ERROR]: (
        <span className={cx('icon-status--error')}>
            <FontAwesomeIcon icon={faCircleExclamation} />
        </span>
    ),
    [STATUS_ICON.WARNING]: (
        <span className={cx('icon-status--warning')}>
            <FontAwesomeIcon icon={faInfo} />
        </span>
    ),
};

//
const Toast = ({ status = Status.error, title = 'Thông báo', text = '...' }: Partial<ToastData>) => {
    const toastRef = useRef<HTMLHeadingElement>(Object(null));

    const handleCloseToast = () => {
        toastRef.current.style.display = 'none';
    };

    return (
        <div ref={toastRef} id={cx('toast')}>
            <div
                className={cx('toast__container', {
                    error: status === Status.error,
                    success: status === Status.success,
                    warning: status === Status.warning,
                })}
            >
                <div className={cx('toast__icon-status')}>{status}</div>
                <div className={cx('toast__content')}>
                    <h2 className={cx('toast-content__heading')}>{title}</h2>
                    <p className={cx('toast-content__text')}>{text}</p>
                </div>
                <div className={cx('toast__close-btn')} onClick={handleCloseToast}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
        </div>
    );
};

export default memo(Toast);
