import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { LogoIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faBars, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '~/Contexts';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Header = () => {
    const [showActions, setShowActions] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const handleLogOut = () => {
        authContext.setAuth(null);
        localStorage.removeItem('account');
    };
    return (
        <div className={cx('header')}>
            <nav className="d-flex justify-content-between align-items-center">
                <div className={cx('logo')}>
                    <Link to="/admin">
                        <LogoIcon width="4.8rem" height="4.8rem" />
                    </Link>
                </div>
                <h1 className={cx('title')}>Love Travel</h1>
                <div className={cx('wrap-btns')}>
                    <HeadlessTippy
                        interactive
                        visible={showActions}
                        placement="bottom"
                        offset={[0, 10]}
                        onClickOutside={() => setShowActions(false)}
                        render={(attrs) => (
                            <ul {...attrs} className={cx('actions')}>
                                <li className={cx('action')}>
                                    <Link to="/admin/profile">
                                        <FontAwesomeIcon icon={faUserSecret} />
                                        Hồ sơ
                                    </Link>
                                </li>
                                <li className={cx('action')}>
                                    <Link to="/auth/login" onClick={handleLogOut}>
                                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        )}
                    >
                        <button id={cx('actions-btn')} onClick={() => setShowActions(!showActions)}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </HeadlessTippy>
                </div>
            </nav>
        </div>
    );
};

export default Header;
