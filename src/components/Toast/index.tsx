import { memo, useState, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCircleExclamation, faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastData } from './interface';
import styles from './styles.module.scss';
import { STATUS_ICON } from './constants';

const cx = classNames.bind(styles);

export const Status: Record<STATUS_ICON, Object> = {
    [STATUS_ICON.SUCCESS]: (
        <span className={cx('icon-status--success')}>
            <FontAwesomeIcon icon={faCheckCircle} />
        </span>
    ),
    [STATUS_ICON.ERROR]: (
        <span className={cx('icon-status--error')}>
            <FontAwesomeIcon icon={faCircleExclamation} />
        </span>
    ),
    [STATUS_ICON.WARNING]: (
        <span className={cx('icon-status--warning')}>
            <FontAwesomeIcon icon={faInfoCircle} />
        </span>
    ),
};

//
const Toast = ({ status = Status.error, show, title = 'Thông báo', text = '...', onHide }: Partial<ToastData>) => {
    const [isShow, setShow] = useState<boolean>(show as boolean);
    const toastContainerRef = useRef<HTMLHeadingElement>(Object(null));
    const handleCloseToast = () => {
        const timeHide = 1500;
        toastContainerRef?.current.animate([{ opacity: 0.3 }, { transform: 'translateX(250%)' }], {
            duration: timeHide,
        });
        onHide ? setTimeout(() => onHide(), timeHide) : setTimeout(() => setShow(false), timeHide);
    };

    useLayoutEffect(() => {
        const timerId = setTimeout(handleCloseToast, 5000);
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            {isShow && (
                <div id={cx('toast')}>
                    <div
                        ref={toastContainerRef}
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
            )}
        </>
    );
};

export default memo(Toast);
