import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { data as tours } from '~/data';
import { useDebounce } from '~/hooks';
import { Tour } from '~/layouts/components/Tour/interface';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [listTour, setListTour] = useState<Tour[]>([]);
    const debounced: string = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounced.trim()) {
            setListTour([]);
        } else {
            const searchedTour = tours.filter((tour) => tour.name.includes(debounced));
            setListTour(searchedTour);
        }
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
