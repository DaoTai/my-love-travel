import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Tour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/Tour/actions';
import { listTourSelector } from '~/layouts/components/Tour/selector';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const listTour: Array<Tour[]> = useSelector(listTourSelector);
    const dispatch = useDispatch();
    const [showResult, setShowResult] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [listSearchTour, setListSearchTour] = useState<Tour[]>([]);
    const debounced: string = useDebounce(searchValue, 600);

    const allTour = useMemo(() => {
        return listTour.reduce((acc: Tour[], tour: Tour[]) => [...acc, ...tour], []);
    }, [listTour]);

    // dispatch action
    useEffect(() => {
        dispatch(getListTour());
    }, []);

    useEffect(() => {
        // When data search empty
        if (!debounced.trim()) {
            return;
        }
        // When data search exist
        const searchedTours = allTour.filter((tour: Tour) => {
            return tour.name.includes(debounced);
        });
        setListSearchTour(searchedTours);
    }, [debounced]);
    return (
        <HeadlessTippy
            interactive
            visible={showResult}
            onClickOutside={() => setShowResult(false)}
            render={(attrs) => (
                <div
                    className={cx('search-result', {
                        exist: listSearchTour.length,
                    })}
                    {...attrs}
                >
                    {listSearchTour.map((tour) => {
                        return (
                            <Link key={tour.id} to={`tour/detail-tour/${tour.id}`} className={cx('tour-item')}>
                                <img
                                    className={cx('tour-item__img')}
                                    src={tour.images && tour.images[0]}
                                    alt="Ảnh tour"
                                />
                                <div className={cx('tour-item__content')}>
                                    <h3 className={cx('tour-item__name')}>{tour.name}</h3>
                                    <p>
                                        Giá:
                                        {tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        >
            <div className={cx('wrap-search-input')}>
                <input
                    type="search"
                    name=""
                    id={cx('search-input')}
                    placeholder="Tìm kiếm..."
                    autoComplete="off"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                    onBlur={() => setListSearchTour([])}
                />
                <button id={cx('icon-search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
