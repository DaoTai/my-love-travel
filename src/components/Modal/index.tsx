import className from 'classnames/bind';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ModalLayout = ({ children }: { children: any }) => {
    return (
        <div id={cx('modal')}>
            <div className={cx('modal')}>{children}</div>
        </div>
    );
};

export default ModalLayout;
