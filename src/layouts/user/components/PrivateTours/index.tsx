import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { privateToursSelector } from './selector';
import { getPrivateTours } from './actions';
import { Tour } from '~/layouts/components/Tour/interface';
import DetailTour from './DetailTour';
import CanceledTour from './CancelTour';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const PrivateTours = () => {
    const privateTours: [] = useSelector(privateToursSelector);
    const dispatch = useDispatch();
    const [detailTour, setDetailTour] = useState();
    const [canceledTour, setCancelTour] = useState({ name: '', id: 0 });
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    // hide modal detail tour
    const onHideDetailModal = useCallback(() => {
        setShowDetailModal(false);
    }, []);
    // Show modal detail tour
    const handleShowDetailModal = (tour: Tour) => {
        setDetailTour(tour as any);
        setShowDetailModal(true);
    };

    // Show modal cancel tour
    const onHideCanceledModal = useCallback(() => {
        setShowCancelModal(false);
    }, []);

    // Handle cancel tour
    const handleShowCancelTour = (id: number, name: string) => {
        setShowCancelModal(true);
        setCancelTour({ id, name });
    };

    // Dispatch to get data
    useEffect(() => {
        dispatch(getPrivateTours());
    }, []);

    return (
        <div className="main">
            {/* Container */}
            <div className={cx('container')}>
                <h1 className={cx('title')}>Tour của bạn</h1>
                <table className={cx('table-private-tours')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID tour</th>
                            <th>Tên tour</th>
                            <th>Địa điểm</th>
                            <th>Ngày khởi hành</th>
                            <th>Chi tiết tour</th>
                            <th>Huỷ tour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {privateTours.map((tour: Tour, index: number) => {
                            const { id, name, place, timeStart } = tour;

                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{place}</td>
                                    <td>{timeStart}</td>
                                    <td>
                                        <span className={cx('detail-icon')} onClick={() => handleShowDetailModal(tour)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleShowCancelTour(id, name)}>Huỷ</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal cancel tour */}
            {showCancelModal && <CanceledTour {...canceledTour} onHide={onHideCanceledModal} />}

            {/* Detail tour modal*/}
            {showDetailModal && <DetailTour tour={detailTour} onHide={onHideDetailModal} />}
        </div>
    );
};

export default PrivateTours;
