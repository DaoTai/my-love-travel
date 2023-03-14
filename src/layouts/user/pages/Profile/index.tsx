import { useRef } from 'react';
import Tippy from '@tippyjs/react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import NewPassword from '~/layouts/user/components/NewPassword';
import Form from '~/layouts/user/components/FormDetail';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Profile = () => {
    const NewPasswordRef = useRef({
        handleShowModal: () => {},
    });

    return (
        <>
            <Helmet>
                <title>Cá nhân</title>
            </Helmet>
            {/* Profile */}
            <div className="main">
                <div id={cx('profile')}>
                    <div className={cx('container')}>
                        <div className={cx('change-password-btn')}>
                            <Tippy content="Đổi mật khẩu" placement="right">
                                <button onClick={() => NewPasswordRef.current.handleShowModal()}>
                                    <FontAwesomeIcon icon={faKey} />
                                </button>
                            </Tippy>
                        </div>
                        <h1 className={cx('title')}>Thông tin cá nhân</h1>
                        <Form />
                    </div>
                    {/* Option buttons */}
                </div>
            </div>

            {/* New password modal */}
            <NewPassword ref={NewPasswordRef} />
        </>
    );
};

export default Profile;
