import { memo, useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import className from 'classnames/bind';
import { deleteTour } from '../actions';
import { DeleteUserProps } from './interface';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const DeleteUser = ({ id, name, onHide }: DeleteUserProps) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const dispatch = useDispatch();

    // Handle delete user
    const handleDeleteTour = () => {
        setShowToast(true);
        dispatch(deleteTour(id));
    };

    useEffect(() => {
        const handleHide = (e: any) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, [showToast]);

    const toastOptions: ToastData = useMemo(() => {
        return {
            title: 'Thành công',
            show: showToast,
            status: Status.success,
            text: `Xoá tour ${name} thành công`,
            onHide: () => {
                setShowToast(false);
            },
        };
    }, [showToast]);
    return (
        <>
            <div id={cx('cancel-tour')}>
                <div className={cx('modal-cancel-tour')}>
                    <h2 className={cx('heading')}>Thông báo</h2>
                    <div className={cx('content')}>
                        <p>
                            Bạn chắc chắn muốn xoá tour:<b> {name}</b> ?
                        </p>
                        <div className={cx('wrap-btns')}>
                            <button className={cx('close-btn')} onClick={onHide}>
                                Thoát
                            </button>
                            <button className={cx('execute-btn')} onClick={handleDeleteTour}>
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default memo(DeleteUser);
