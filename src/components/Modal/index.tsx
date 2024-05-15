import className from 'classnames/bind';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ModalLayout = ({ size, title, children }: { size?: 'small'; title?: string; children?: any }) => {
    return (
        <div id={cx('modal')}>
            <div
                className={cx('modal', {
                    small: size === 'small',
                })}
            >
                <h1 className={cx('heading')}>{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
