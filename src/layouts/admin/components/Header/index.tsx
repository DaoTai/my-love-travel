import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { LogoIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faBars, faShieldAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '~/Contexts';
import { NewPassword } from '~/layouts/user/components';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Header = ({ setShowNavbar }: { setShowNavbar: () => void }) => {
    const [showActions, setShowActions] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const NewPasswordRef = useRef({
        handleShowModal: () => {},
    });
    const handleLogOut = () => {
        authContext.setAuth(null);
        // localStorage.removeItem('account');
    };
    return (
        <>
            <div className={cx('header')}>
                <nav className="d-flex justify-content-between align-items-center">
                    <div className={cx('logo')}>
                        <div onClick={setShowNavbar}>
                            <LogoIcon width="4.8rem" height="4.8rem" />
                        </div>
                    </div>
                    <Link to="/admin" className={cx('title')}>
                        Love Travel
                    </Link>
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
                                        <div id={cx('new-password')} onClick={NewPasswordRef.current.handleShowModal}>
                                            <FontAwesomeIcon icon={faShieldAlt} />
                                            Đổi mật khẩu
                                        </div>
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

            {/* New password modal */}
            <NewPassword ref={NewPasswordRef} />
        </>
    );
};

export default Header;
