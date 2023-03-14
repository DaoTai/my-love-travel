import { lazy, useEffect, useState, useRef, useCallback, ChangeEvent, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { faArrowLeft, faArrowRight, faChevronDown, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import Tour from '~/layouts/components/Tour';
import { TYPE_SEARCH } from './constants';
import { Tour as ITour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/Tour/actions';
import { listTourSelector as storeListTour } from '~/layouts/components/Tour/selector';
import { categories } from '~/layouts/admin/pages/ManageTours/DetailTour/config';
import style from '../styles.module.scss';
const cx = classNames.bind(style);

const Search = () => {
    const listTourSelector: Array<ITour[]> = useSelector(storeListTour);
    const dispatch = useDispatch();
    const [showCategory, setShowCategory] = useState<boolean>(false);
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
        const flatTours = listTourSelector.reduce((acc: ITour[], tours: ITour[]) => [...acc, ...tours], []);
        // When data search empty
        if (!debounced.trim()) {
            // When change type search(category)
            if (typeSearch) {
                const toursByCategory = flatTours.filter((tour) => tour.categories.includes(typeSearch));
                setListTour(toursByCategory);
                return;
            }
            dispatch(getListTour());
            setCurrentPage(1);
            return;
        }
        // When data search exist
        const searchedTours = flatTours.filter((tour: ITour) => {
            if (typeSearch) {
                return (
                    tour.place.toLowerCase().includes(debounced.toLowerCase()) && tour.categories?.includes(typeSearch)
                );
            }
            return tour.place.includes(debounced);
        });
        setListTour(searchedTours);
    }, [debounced, typeSearch, dispatch]);

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

    // Handle select category
    const handleSelectCategory = (category: TYPE_SEARCH | null) => {
        setTypeSearch(category);
        setShowCategory(false);
    };
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
                        placeholder="Địa điểm bạn muốn đi?"
                        value={searchValue}
                        onChange={(e) => handleChangeSearchValue(e)}
                    />
                </div>
                {/* Select options */}
                <div id={cx('select-category')}>
                    <HeadlessTippy
                        placement="bottom"
                        interactive
                        visible={showCategory}
                        onClickOutside={() => setShowCategory(false)}
                        render={(attrs) => (
                            <ul className={cx('categories')} {...attrs}>
                                <li className={cx('category')} onClick={() => handleSelectCategory(null)}>
                                    Tất cả
                                </li>
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className={cx('category')}
                                        onClick={() => handleSelectCategory(category as TYPE_SEARCH)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    >
                        <button type="button" onClick={() => setShowCategory(!showCategory)}>
                            <span>{typeSearch ? typeSearch : 'Tất cả'}</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </HeadlessTippy>
                </div>
            </div>

            {/* List tour */}
            <div className={cx('wrap-list-tour')} ref={wrapListTour}>
                {listTour.length > 0 ? (
                    <div id={cx('list-tour')}>
                        {listTour.map((tour, i) => (
                            <Suspense key={i} fallback={<p>Đang tải...</p>}>
                                <Tour tour={tour} favIdTours={favIdTours} onAddFavTour={handleAddFavTour} />
                            </Suspense>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Danh sách tour trống</p>
                )}
            </div>

            {/* Pagination */}
            {!searchValue && !typeSearch && (
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
            )}
        </>
    );
};

export default Search;
