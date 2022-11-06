import { memo, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import className from 'classnames/bind';
import { deletePrivateTour } from '../actions';
import { CanceledTourProps } from './interface';
import Modal from '~/components/Modal';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const CanceledTour = ({ id, name, onHide }: CanceledTourProps) => {
    const dispatch = useDispatch();
    const handleDeleteTour = () => {
        dispatch(deletePrivateTour(id));
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
        <Modal>
            <h2 className={cx('heading')}>Thông báo</h2>
            <div className={cx('content')}>
                <p>
                    Bạn chắc chắn muốn huỷ tour:<b> {name}</b>
                </p>
                <p>Lưu ý: nếu quý khách huỷ tour trước 12 tiếng tour diễn ra, quý khách sẽ không được hoàn tiền</p>
                <a href="/">Chính sách hoàn tiền</a>
                <div className={cx('wrap-btns')}>
                    <button className={cx('close-btn')} onClick={onHide}>
                        Thoát
                    </button>
                    <button className={cx('execute-btn')} onClick={handleDeleteTour}>
                        Tôi đồng ý
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default memo(CanceledTour);
