import { useRef } from 'react';
import Tippy from '@tippyjs/react';
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
            {/* Profile */}
            <div className="main">
                <div id={cx('profile')}>
                    <h1 className={cx('title')}>Thông tin cá nhân</h1>
                    <div className={cx('container')}>
                        <Form />
                        <div className={cx('wrap-buttons')}>
                            <Tippy content="Đổi mật khẩu" placement="right">
                                <button onClick={() => NewPasswordRef.current.handleShowModal()}>
                                    <FontAwesomeIcon icon={faKey} />
                                </button>
                            </Tippy>
                        </div>
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
