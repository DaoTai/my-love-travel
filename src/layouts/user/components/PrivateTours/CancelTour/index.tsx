import { memo } from 'react';
import className from 'classnames/bind';
import { CanceledTourProps } from './interface';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const CanceledTour = ({ id, name, onHide }: CanceledTourProps) => {
    console.log('Id: ', id);

    return (
        <div id={cx('cancel-tour')}>
            <div className={cx('modal-cancel-tour')}>
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
                        <button className={cx('execute-btn')}> Tôi đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CanceledTour);
