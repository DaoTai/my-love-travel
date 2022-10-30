import { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import Tour from '~/layouts/components/Tour';
import { TYPE_SEARCH } from './constants';
import { Tour as ITour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/Tour/actions';
import { listTourSelector as storeListTour } from '~/layouts/components/Tour/selector';
import style from '../styles.module.scss';
const cx = classNames.bind(style);

const Search = () => {
    const listTourSelector: Array<ITour[]> = useSelector(storeListTour);
    const dispatch = useDispatch();
    const [favIdTours, setFavIdTours] = useState<number[]>(() => {
        const parseLocal = JSON.parse(`${localStorage.getItem('favTours')}`);
        return parseLocal ?? [];
    });
    const [listTour, setListTour] = useState<ITour[] | []>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [typeSearch, setTypeSearch] = useState<TYPE_SEARCH | null>(null);

    const searchRef = useRef(Object(null));
    const wrapListTour = useRef(Object(null));
    const debounced: string = useDebounce(searchValue, 600);

    useEffect(() => {
        // Get selector
        setListTour(listTourSelector[currentPage - 1]);
    }, [listTourSelector, currentPage]);

    useEffect(() => {
        // When data search empty
        if (!debounced.trim()) {
            dispatch(getListTour());
            setCurrentPage(1);
            return;
        }

        const flatTours = listTourSelector.reduce((acc: ITour[], tours: ITour[]) => [...acc, ...tours], []);

        // When data search exist
        const searchedTours = flatTours.filter((tour: ITour) => {
            if (typeSearch) {
                return tour.place.includes(debounced) && tour.categories?.includes(typeSearch);
            }
            return tour.name.includes(debounced);
        });
        setListTour(searchedTours);
    }, [debounced, typeSearch]);

    // On change search value
    const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const valueInput = e.target.value;
        if (!valueInput.startsWith(' ')) {
            setSearchValue(valueInput);
        }
    };

    // Empty search value
    const handleEmptySearchValue = () => {
        searchRef.current.focus();
        setSearchValue('');
        dispatch(getListTour());
    };

    // Handle prev / next page
    const handlePrevPage = () => {
        wrapListTour.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setCurrentPage((prev) => {
            return prev > 1 ? prev - 1 : prev;
        });
    };
    const handleNextPage = () => {
        wrapListTour.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setCurrentPage((prev) => {
            return prev < listTourSelector.length ? prev + 1 : prev;
        });
    };

    // Handle add favourite tours
    const handleAddFavTour = useCallback((idFavTour: number) => {
        setFavIdTours((prev: number[]) => {
            const isExistFavTour = prev.includes(idFavTour);
            let newFavTours;
            isExistFavTour
                ? (newFavTours = prev.filter((id: number) => id !== idFavTour))
                : (newFavTours = [...prev, idFavTour]);
            localStorage.setItem('favTours', JSON.stringify(newFavTours));
            return newFavTours;
        });
    }, []);
    return (
        <>
            {/* Search input */}
            <div id={cx('search')}>
                <div className={cx('wrap-input-search')}>
                    <div className={cx('icon-search')}>
                        <FontAwesomeIcon icon={faSearch} />
                        {/* Close button */}
                        {searchValue && (
                            <div className={cx('icon-close')} onClick={handleEmptySearchValue}>
                                <FontAwesomeIcon icon={faClose} />
                            </div>
                        )}
                    </div>
                    <input
                        ref={searchRef}
                        autoComplete="off"
                        id={cx('input-search')}
                        type="text"
                        placeholder="Tìm kiếm tên tour"
                        value={searchValue}
                        onChange={(e) => handleChangeSearchValue(e)}
                    />
                </div>
                {/* Select options */}
                <select id={cx('select-tour')} name="" onChange={(e) => setTypeSearch(e.target.value as TYPE_SEARCH)}>
                    <option value="">...</option>
                    <option value="Di tích lịch sử">Di tích lịch sử</option>
                    <option value="Sinh thái khám phá">Sinh thái khám phá</option>
                    <option value="Nghỉ dưỡng">Nghỉ dưỡng</option>
                </select>
            </div>

            {/* List tour */}
            <div className={cx('wrap-list-tour')} ref={wrapListTour}>
                {listTour.length > 0 ? (
                    <div id={cx('list-tour')}>
                        {listTour.map((tour, i) => (
                            <Tour key={i} tour={tour} favIdTours={favIdTours} onAddFavTour={handleAddFavTour} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Danh sách tour trống</p>
                )}
            </div>

            {/* Pagination */}
            <div className={cx('pagination')}>
                <button onClick={handlePrevPage} className={currentPage === 1 ? cx('disabled') : ''}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span className={cx('current-page')}>{currentPage}</span>
                <button
                    onClick={handleNextPage}
                    className={currentPage === listTourSelector.length ? cx('disabled') : ''}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );
};

export default Search;
