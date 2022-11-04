import { memo, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import className from 'classnames/bind';
import { deleteUser } from '../actions';
import { DeleteUserProps } from './interface';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const DeleteUser = ({ id, name, onHide }: DeleteUserProps) => {
    const dispatch = useDispatch();

    const handleDeleteTour = () => {
        dispatch(deleteUser(id));
        onHide();
    };
    useEffect(() => {
        const handleHide = (e: any) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, []);
    return (
        <div id={cx('cancel-tour')}>
            <div className={cx('modal-cancel-tour')}>
                <h2 className={cx('heading')}>Thông báo</h2>
                <div className={cx('content')}>
                    <p>
                        Bạn chắc chắn muốn xoá người dùng:<b> {name}</b>
                    </p>
                    <div className={cx('wrap-btns')}>
                        <button className={cx('close-btn')} onClick={onHide}>
                            Thoát
                        </button>
                        <button className={cx('execute-btn')} onClick={handleDeleteTour}>
                            Tôi đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(DeleteUser);
