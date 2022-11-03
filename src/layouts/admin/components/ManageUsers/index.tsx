import React from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
const cx = className.bind(styles);
const ManageUsers = () => {
    return (
        <div id={cx('manage-users')}>
            <div className={cx('wrap-search-options')}>
                <div className={cx('search-input')}>
                    <input type="text" id={cx('search-input')} />
                    <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
                </div>
                <div className={cx('select-type-user')}>Select</div>
            </div>
            <div className={cx('wrap-table')}>
                <table id={cx('table-manage-users')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Tên người dùng</th>
                            <th>Chi tiết người dùng</th>
                            <th>Xoá người dùng</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
