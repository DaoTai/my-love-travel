import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Profile = () => {
    return (
        <div id={cx('profile')}>
            <h1>Hello ae</h1>
        </div>
    );
};

export default Profile;
