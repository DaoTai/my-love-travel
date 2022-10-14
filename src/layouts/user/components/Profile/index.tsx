import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const profileData = {
    name: 'Thomas Shelby',
    gender: 'nam',
    dob: '24/10/2001',
    address: 'Ha Noi',
    email: 'thomas123@gmail.com',
    phone: '0868930418',
};

const Profile = () => {
    const [profile, setProfile] = useState(profileData);
    return (
        <div id={cx('profile')}>
            <h1 className={cx('title')}>Thông tin cá nhân</h1>
            <div className={cx('container')}>
                {/* Image */}
                <div className={cx('avatar')}>
                    <img src="https://manofmany.com/wp-content/uploads/2018/09/Tom-Shelby.jpg" alt="" />
                </div>
                {/* Content */}
                <div className={cx('content')}>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Họ tên
                        </label>
                        <input className={cx('form-input')} type="text" value={profile.name} />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Ngày sinh
                        </label>
                        <input className={cx('form-input')} type="text" value={profile.dob} />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Địa chỉ
                        </label>
                        <input className={cx('form-input')} type="text" value={profile.address} />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Giới tính
                        </label>
                        <div className={cx('form-group')}>
                            <label htmlFor="">
                                Nam
                                <input className={cx('form-input')} type="radio" value="nam" />
                            </label>
                            <label htmlFor="">
                                Nữ
                                <input className={cx('form-input')} type="radio" value="nữ" />
                            </label>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Số điện thoại
                        </label>
                        <input className={cx('form-input')} type="text" value={profile.phone} />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Email
                        </label>
                        <input className={cx('form-input')} type="emaik" value={profile.email} />
                    </div>
                </div>

                {/* Option buttons */}
                <div className={cx('wrap-buttons')}>
                    <button>Lưu lại</button>
                    <button>Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
