import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LogoIcon } from '~/components/Icons';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    return (
        <HeadlessTippy
            interactive
            visible={showResult}
            render={(attrs) => (
                <div className={cx('search-result')} {...attrs}>
                    <Link to="/@12" id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </Link>
                    <Link to="/123" id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </Link>
                    <Link to="/123" id={cx('tour-item')} className="d-flex align-items-center">
                        <LogoIcon />
                        <div className={cx('tour-item__content')}>
                            <h3>Tên tour</h3>
                            <p>Giá tour: 100$</p>
                        </div>
                    </Link>
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <div className={cx('wrap-search-input')}>
                <input
                    type="search"
                    name=""
                    id={cx('search-input')}
                    placeholder="Search..."
                    autoComplete="off"
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
