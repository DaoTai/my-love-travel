import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import className from 'classnames/bind';
import { deleteUser } from '../actions';
import { DeleteUserProps } from './interface';
import Modal from '~/components/Modal';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const DeleteUser = ({ id, name, onHide, isOpen }: DeleteUserProps) => {
    const dispatch = useDispatch();
    // Handle delete user
    const handleDeleteUser = () => {
        dispatch(deleteUser(id));
        onHide();
    };

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            e.which === 27 && onHide();
            e.which === 13 && handleDeleteUser();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {isOpen && (
                <Modal title="Thông báo" size="small">
                    <div className={cx('modal-cancel-tour')}>
                        <div className={cx('content')}>
                            <p>
                                Bạn chắc chắn muốn xoá người dùng:<b> {name}</b> ?
                            </p>
                            <div className={cx('wrap-btns')}>
                                <button className={cx('close-btn')} onClick={onHide}>
                                    Thoát
                                </button>
                                <button className={cx('execute-btn')} onClick={handleDeleteUser}>
                                    Đồng ý
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default memo(DeleteUser);
