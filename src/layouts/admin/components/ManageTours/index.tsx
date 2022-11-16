import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { STATUS } from './constants';
import { getTours } from './actions';
import { manageToursSelector } from './selectors';
import { Tour } from '~/layouts/components/Tour/interface';
import DetailModal from './DetailTour';
import DeleteModal from './DeleteTour';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ManageTours = () => {
    const dispatch = useDispatch();
    const allTours: Array<Tour[]> = useSelector(manageToursSelector);
    const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>(STATUS.ACTIVITING);
    const [detailTour, setDetailTour] = useState<Tour>();
    const [deleteTour, setDeleteTour] = useState({ name: '', id: 0 });
    const searchInputRef = useRef(Object(null));

    const listTour = useMemo(() => {
        const flatTours = allTours?.reduce((acc, tours: Tour[]) => [...acc, ...tours], []);
        let result = flatTours.filter((tour: Tour) => tour.status === selectedStatus);
        if (searchValue) {
            result = flatTours.filter(
                (tour: Tour) =>
                    tour.status === selectedStatus && tour.name?.toLowerCase().includes(searchValue.toLowerCase()),
            );
        }
        return result;
    }, [allTours, selectedStatus, searchValue]);

    const handleHideDetail = useCallback(() => {
        setShowModalDetail(false);
    }, []);

    const handleHideDelete = useCallback(() => {
        setShowModalDelete(false);
    }, []);

    // Dispatch get data tours
    useEffect(() => {
        dispatch(getTours());
    }, [dispatch]);

    // Handle select type
    const handleSelectType = (type: string) => {
        setSelectedStatus(type);
        setShowSelectStatus(false);
    };
    // Emptry search input
    const handleEmptySearch = () => {
        setSearchValue('');
        searchInputRef.current.focus();
    };

    // Show Detail tour
    const handleShowDetail = (tour: Tour) => {
        setDetailTour(tour);
        setShowModalDetail(true);
    };

    // Handle delete tour
    const handleDeleteTour = (tour: Tour) => {
        setShowModalDelete(true);
        setDeleteTour({
            id: tour.id as number,
            name: tour.name as string,
        });
    };
    return (
        <>
            <div id={cx('manage-tours')}>
                <div className={cx('wrap-search-options')}>
                    <div className={cx('search-input')}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            id={cx('search-input')}
                            placeholder="Tìm kiếm tour"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faClose} className={cx('close-icon')} onClick={handleEmptySearch} />
                    </div>
                    <div className={cx('select-status-tour')}>
                        <HeadlessTippy
                            placement="bottom"
                            interactive
                            visible={showSelectStatus}
                            onClickOutside={() => setShowSelectStatus(false)}
                            render={(attrs) => (
                                <ul className={cx('list-status-select')} {...attrs}>
                                    <li className={cx('status')} onClick={() => handleSelectType(STATUS.ACTIVITING)}>
                                        {STATUS.ACTIVITING}
                                    </li>
                                    <li className={cx('status')} onClick={() => handleSelectType(STATUS.PENDING)}>
                                        {STATUS.PENDING}
                                    </li>
                                    <li className={cx('status')} onClick={() => handleSelectType(STATUS.ENDING)}>
                                        {STATUS.ENDING}
                                    </li>
                                </ul>
                            )}
                        >
                            <button onClick={() => setShowSelectStatus(!showSelectStatus)}>
                                <span>{selectedStatus}</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </HeadlessTippy>
                    </div>
                </div>
                <div className={cx('wrap-table')}>
                    <table id={cx('table-manage-tours')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên tour</th>
                                <th>Địa điểm</th>
                                <th>Chi tiết tour</th>
                                <th>Xoá tour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTour.map((tour, i) => (
                                <tr key={tour.id}>
                                    <td>{i + 1}</td>
                                    <td>{tour.name}</td>
                                    <td>{tour.place}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            className="detail-icon"
                                            icon={faEye}
                                            onClick={() => handleShowDetail(tour)}
                                        />
                                    </td>
                                    <td>
                                        <FontAwesomeIcon
                                            className="delete-icon"
                                            icon={faTrashCan}
                                            onClick={() => handleDeleteTour(tour)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detail */}
            {showModalDetail && <DetailModal tour={detailTour} onHide={handleHideDetail} />}
            {/* Modal Delete */}
            {showModalDelete && <DeleteModal {...deleteTour} onHide={handleHideDelete} />}
        </>
    );
};

export default ManageTours;
