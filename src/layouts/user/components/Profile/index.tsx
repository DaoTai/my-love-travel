import { useState, useCallback } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import NewPassword from './NewPassword';
import Form from './FormDetail';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Profile = () => {
    const [showNewPasswordModal, setshowNewPasswordModal] = useState<boolean>(false);

    // Show newpassword modal
    const showModal = () => {
        setshowNewPasswordModal(true);
    };

    // Show newpassword modal
    const hideModal = useCallback(() => {
        setshowNewPasswordModal(false);
    }, []);

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
                                <button onClick={showModal}>
                                    <FontAwesomeIcon icon={faKey} />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    {/* Option buttons */}

                    {/* New password modal */}
                    {showNewPasswordModal && <NewPassword onHide={hideModal} />}
                </div>
            </div>
        </>
    );
};

export default Profile;
