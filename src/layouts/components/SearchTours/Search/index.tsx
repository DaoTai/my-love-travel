import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import Tour from '~/layouts/components/Tour';
import { data } from './FakeData';
import style from '../styles.module.scss';
import { useDebounce } from '~/hooks';
const cx = classNames.bind(style);

enum TYPE_SEARCH {
    HISTORY = 'Di tích lịch sử',
    EXPLORE = 'Sinh thái khám phá',
    RESORT = 'Nghỉ dưỡng',
}

const Search = () => {
    const searchRef: any = useRef(Object(null));
    const [searchValue, setSearchValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [typeSearch, setTypeSearch] = useState<TYPE_SEARCH | null>(null);
    const MAX_LENGTH = 4;
    const debounced = useDebounce(searchValue, 600);
    useEffect(() => {
        if (!debounced.trim()) {
            console.log([]);
            return;
        }

        // Call API
        console.log('Call API');
        console.log('Tìm kiếm theo: ', typeSearch);
    }, [debounced, typeSearch]);

    // On change search value
    const handleChangeSearchValue = (e: any) => {
        const valueInput = e.target.value;
        if (!valueInput.startsWith(' ')) {
            setSearchValue(valueInput);
        }
    };

    // Empty search value
    const handleEmptySearchValue = () => {
        searchRef.current.focus();
        setSearchValue('');
    };

    // Handle prev / next page
    const handlePrevPage = () => {
        setCurrentPage((prev) => {
            return prev > 1 ? prev - 1 : prev;
        });
    };
    const handleNextPage = () => {
        setCurrentPage((prev) => {
            return prev < MAX_LENGTH ? prev + 1 : prev;
        });
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
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={(e) => handleChangeSearchValue(e)}
                    />
                </div>
                {/* Select options */}
                <select id={cx('select-tour')} name="" onChange={(e) => setTypeSearch(e.target.value as TYPE_SEARCH)}>
                    <option value=""></option>
                    <option value="Di tích lịch sử">Di tích lịch sử</option>
                    <option value="Sinh thái khám phá">Sinh thái khám phá</option>
                    <option value="Nghỉ dưỡng">Nghỉ dưỡng</option>
                </select>
            </div>

            {/* List tour */}
            <div id={cx('list-tour')}>
                {data.map((tour, i) => (
                    <Tour key={i} tour={tour} />
                ))}
            </div>

            {/* Pagination */}
            <div className={cx('pagination')}>
                <button onClick={handlePrevPage} className={currentPage === 1 ? cx('disabled') : ''}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span className={cx('current-page')}>{currentPage}</span>
                <button onClick={handleNextPage} className={currentPage === MAX_LENGTH ? cx('disabled') : ''}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );
};

export default Search;
