import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { DetailPrivateTourProps } from './interface';
import Modal from '~/components/Modal';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const DetailPrivateTour = ({ tour, onHide }: DetailPrivateTourProps) => {
    useEffect(() => {
        const handleHide = (e: KeyboardEvent) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, []);
    return (
        <Modal title="Thông tin tour">
            <button id={cx('close-btn')} onClick={onHide}>
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className={cx('wrap-tour-infor d-flex justify-content-between ')}>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Người dẫn tour: </label>
                    <span>{tour?.guide || 'Chưa xác định'}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Số vé bạn đã đặt: </label>
                    <span>{tour?.bookedTours}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Tên tour: </label>
                    <span>{tour?.name}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Địa điểm: </label>
                    <span>{tour?.place}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Giờ khởi hành: </label>
                    <span>{tour?.hourStart}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Ngày khởi hành: </label>
                    <span>{tour?.timeStart}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Ngày kết thúc: </label>
                    <span>{tour?.timeEnd}</span>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Thể loại: </label>
                    <ul>
                        {tour?.categories.map((category: string, i) => {
                            return (
                                <li key={i}>
                                    <span>{category}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={cx('private-tour-infor')}>
                    <label htmlFor="">Tiện ích dịch vụ: </label>
                    <ul>
                        {tour?.utilities.map((utility: string, i) => {
                            return (
                                <li key={i}>
                                    <span>{utility}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className={cx('private-tour-infor')}>
                <Link to={`/tour/detail-tour/${tour?.id}`}>Chi tiết</Link>
            </div>
        </Modal>
    );
};

export default memo(DetailPrivateTour);
