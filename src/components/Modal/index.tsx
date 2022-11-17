import className from 'classnames/bind';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ModalLayout = (props: any) => {
    return (
        <div id={cx('modal')}>
            <div
                className={cx('modal', {
                    small: props.size === 'small',
                })}
            >
                <h1 className={cx('heading')}>{props.title}</h1>
                {props.children}
            </div>
        </div>
    );
};

export default ModalLayout;
