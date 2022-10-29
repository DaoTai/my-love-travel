import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '~/hooks';
import { Tour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/SearchTours/actions';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const listTourSelector = useSelector((state: any) => state.listTour);
    const dispatch = useDispatch();
    const [showResult, setShowResult] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [listTour, setListTour] = useState<Tour[]>([]);
    const debounced: string = useDebounce(searchValue, 600);

    useEffect(() => {
        // Get selector
        setListTour(listTourSelector[0]);
    }, [listTourSelector]);

    useEffect(() => {
        // When data search empty
        if (!debounced.trim()) {
            dispatch(getListTour());
            return;
        }

        // When data search exist
        const searchedTours = listTour.filter((tour: Tour) => {
            return tour.name.includes(debounced);
        });
        setListTour(searchedTours);
    }, [debounced]);
    return (
        <HeadlessTippy
            interactive
            visible={showResult}
            onClickOutside={() => setShowResult(false)}
            render={(attrs) => (
                <div className={cx('search-result')} {...attrs}>
                    {listTour.length > 0 ? (
                        listTour.map((tour) => {
                            return (
                                <Link key={tour.id} to={`tour/detail-tour/${tour.id}`} className={cx('tour-item')}>
                                    <img
                                        className={cx('tour-item__img')}
                                        src={tour.images && tour.images[0]}
                                        alt="Ảnh tour"
                                    />
                                    <div className={cx('tour-item__content')}>
                                        <h3>{tour.name}</h3>
                                        <p>
                                            Giá:
                                            {tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <p className="text-center">Tìm kiếm tour</p>
                    )}
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
                />
                <button id={cx('icon-search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
