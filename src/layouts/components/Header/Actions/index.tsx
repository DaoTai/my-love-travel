import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faUserAstronaut,
    faMap,
    faCoins,
    faArrowRightToBracket,
    faHeartCircleBolt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '~/Contexts';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Actions = () => {
    const authContext = useContext(AuthContext);
    const [isShow, setShow] = useState<boolean>(false);
    useEffect(() => {
        // console.log(authContext);
    }, []);
    if (!authContext.auth) {
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
    return (
        <>
            {/* is active  */}
            <HeadlessTippy
                visible={isShow}
                interactive
                render={(attrs) => (
                    <div className={cx('actions')} {...attrs}>
                        <Tippy duration={[300, 250]} content="Tài khoản" placement="left">
                            <Link className={cx('action')} to="/">
                                <FontAwesomeIcon icon={faUserAstronaut} />
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Tours của bạn" placement="left">
                            <Link className={cx('action')} to="/">
                                <FontAwesomeIcon icon={faMap} />
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Coins" placement="left">
                            <Link className={cx('action')} to="/">
                                <FontAwesomeIcon icon={faCoins} />
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Tour yêu thích" placement="left">
                            <Link className={cx('action')} to="/">
                                <FontAwesomeIcon icon={faHeartCircleBolt} />
                            </Link>
                        </Tippy>
                        <Tippy duration={[300, 250]} content="Đăng xuất" placement="left">
                            <Link className={cx('action')} to="/auth/login">
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
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
