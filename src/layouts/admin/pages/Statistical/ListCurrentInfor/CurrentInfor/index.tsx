import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faStar, faChevronCircleDown, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { CurrentInforProps } from './interface';
import styles from '../styles.module.scss';
const cx = className.bind(styles);
const CurrentInfor = ({
    heading,
    progressPercent,
    icon = faChevronCircleUp,
    amount,
    isMorePreviousMonth,
}: CurrentInforProps) => {
    const Icon = isMorePreviousMonth ? icon : faChevronCircleDown;
    return (
        <div className={cx('current-infor')}>
            <h4 className={cx('infor__heading')}>
                <FontAwesomeIcon icon={faPaperclip} />
                {heading}
            </h4>
            <div className={cx('infor__desc')}>
                <b
                    className={cx('infor__progress-percent', {
                        up: isMorePreviousMonth,
                    })}
                >
                    {progressPercent ? (
                        <>
                            <div className={cx('infor__icon')}>
                                <FontAwesomeIcon icon={Icon} />
                            </div>
                            {progressPercent} <span>%</span>
                        </>
                    ) : (
                        ''
                    )}
                </b>
                <div className={cx('infor__amount')}>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{new Intl.NumberFormat('de-DE').format(amount)}</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentInfor;
