import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faKey, faSave } from '@fortawesome/free-solid-svg-icons';
import { profile as profileData } from '~/data';
import { updateProfileOptions } from './config';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

interface Avatar {
    pre?: string;
}

const Profile = () => {
    const [profile, setProfile] = useState(profileData);
    const [avatar, setAvatar] = useState(profileData.avatar as Avatar);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            avatar: profile.avatar,
            fullName: profile.fullName,
            gender: profile.gender,
            dob: profile.dob,
            address: profile.address,
            email: profile.email,
            phone: profile.phone,
        },
        validationSchema: updateProfileOptions,
        onSubmit: (values) => {
            setProfile((prev) => ({ ...prev, values }));
            console.log('Values: ', values);
        },
    });

    // Preview Avatar
    const handlePreviewAvatar = (e: any) => {
        const file = e.target.files[0];
        file.pre = URL.createObjectURL(file);
        setAvatar(file);
        setFieldValue('avatar', file);
        e.target.value = null;
    };

    useEffect(() => {
        return () => {
            avatar.pre && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);

    return (
        <div id={cx('profile')}>
            <h1 className={cx('title')}>Thông tin cá nhân</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('container')}>
                    {/* Image */}
                    <div className={cx('avatar')}>
                        <img src={avatar.pre || values.avatar} alt="" />

                        <div id={cx('wrap-input-image')}>
                            <Tippy
                                animation="fade"
                                placement="bottom"
                                content="Thay ảnh đại diện"
                                duration={[100, 500]}
                            >
                                <label className={cx('form-label')} htmlFor="avatar">
                                    <FontAwesomeIcon icon={faImages} />
                                </label>
                            </Tippy>
                        </div>
                        <input
                            id="avatar"
                            name="avatar"
                            className={cx('form-input')}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handlePreviewAvatar}
                        />
                    </div>
                    {/* Content */}
                    <div className={cx('content')}>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="fullName">
                                Họ tên
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    className={cx('form-input')}
                                    type="text"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.fullName && touched.fullName ? errors.fullName : null}
                                </p>
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="dob">
                                Ngày sinh
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="dob"
                                    name="dob"
                                    className={cx('form-input')}
                                    type="text"
                                    value={values.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.dob && touched.dob ? errors.dob : null}</p>
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="address">
                                Địa chỉ
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    className={cx('form-input')}
                                    type="text"
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.address && touched.address ? errors.address : null}
                                </p>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="">
                                Giới tính
                            </label>
                            <div className={cx('form-group')}>
                                <label htmlFor="">
                                    Nam
                                    <input
                                        name="gender"
                                        value="nam"
                                        className={cx('form-input')}
                                        type="radio"
                                        checked={values.gender === 'nam' || values.gender === 'Nam'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </label>
                                <label htmlFor="">
                                    Nữ
                                    <input
                                        name="gender"
                                        className={cx('form-input')}
                                        type="radio"
                                        value="nữ"
                                        checked={values.gender === 'nữ' || values.gender === 'Nữ'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p className={cx('error-msg')}>
                                        {errors.gender && touched.gender ? errors.gender : null}
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="phone">
                                Số điện thoại
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    name="phone"
                                    className={cx('form-input')}
                                    type="text"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.phone && touched.phone ? errors.phone : null}</p>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="email">
                                Email
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="email"
                                    name="email"
                                    className={cx('form-input')}
                                    type="emaik"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                        </div>
                    </div>

                    {/* Option buttons */}
                    <div className={cx('wrap-buttons')}>
                        <Tippy content="Lưu lại" placement="right">
                            <button type="submit">
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </Tippy>
                        <Tippy content="Đổi mật khẩu" placement="right">
                            <button>
                                <FontAwesomeIcon icon={faKey} />
                            </button>
                        </Tippy>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
