import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserAstronaut, faMap, faCoins, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);
const Actions = () => {
    const [isShow, setShow] = useState<boolean>(false);

    return (
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
                    <Tippy duration={[300, 250]} content="Đăng xuất" placement="left">
                        <Link className={cx('action')} to="/">
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
    );
};

export default Actions;
