import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faUserAstronaut,
    faMap,
    faArrowRightToBracket,
    faHeartCircleBolt,
    faReceipt,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '~/Contexts';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Actions = () => {
    const authContext = useContext(AuthContext);
    const [isShow, setShow] = useState<boolean>(false);
    const localAccount = localStorage.getItem('account');
    useEffect(() => {
        // console.log('Local storage: ', localAccount);
    }, []);

    const handleLogOut = () => {
        authContext.setAuth(null);
        localStorage.removeItem('account');
    };

    const handleHideShow = () => {
        setShow(!isShow);
    };

    // AuthContext is exist
    if (!authContext.auth && !localAccount) {
        return (
            <div id={cx('auth-btns')} className="d-flex">
                <Link className={cx('auth-btn')} to="/auth/register">
                    Đăng ký
                </Link>
                <Link className={cx('auth-btn')} to="/auth/login">
                    Đăng nhập
                </Link>
            </div>
        );
    }

    // AuthContext is not exist
    return (
        <>
            {/* is active  */}
            <HeadlessTippy
                visible={isShow}
                interactive
                render={(attrs) => (
                    <div className={cx('actions')} {...attrs}>
                        <Tippy duration={[300, 250]} content="Khám phá" placement="left">
                            <Link id={cx('search-tour-mobile')} to="/search-tours" onClick={handleHideShow}>
                                <FontAwesomeIcon icon={faSearch} />
                                <span>Khám phá</span>
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Tài khoản" placement="left">
                            <Link className={cx('action')} to="/user/profile" onClick={handleHideShow}>
                                <FontAwesomeIcon icon={faUserAstronaut} />
                                <span>Tài khoản</span>
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Tours của bạn" placement="left">
                            <Link className={cx('action')} to="/user/private-tours" onClick={handleHideShow}>
                                <FontAwesomeIcon icon={faMap} />
                                <span>Tours của bạn</span>
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Lịch sử giao dịch" placement="left">
                            <Link className={cx('action')} to="/user/history" onClick={handleHideShow}>
                                <FontAwesomeIcon icon={faReceipt} />
                                <span>Lịch sử giao dịch</span>
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Tour yêu thích" placement="left">
                            <Link className={cx('action')} to="/user/favourite-tours" onClick={handleHideShow}>
                                <FontAwesomeIcon icon={faHeartCircleBolt} />
                                <span>Tour yêu thích</span>
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Đăng xuất" placement="left">
                            <Link className={cx('action')} to="/auth/login" onClick={handleLogOut}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                <span>Đăng xuất</span>
                            </Link>
                        </Tippy>
                    </div>
                )}
            >
                <button
                    className={cx('toggle-actions', {
                        active: isShow,
                    })}
                    onClick={() => setShow(!isShow)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </HeadlessTippy>
        </>
    );
};

export default Actions;
