import { useState, useEffect, useCallback, useMemo } from 'react';
import Tippy from '@tippyjs/react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { updateProfileOptions } from '../config';
import { Profile as IProfile } from '../interface';
import { profileSelector as profileStore } from '../selectors';
import { getProfile, updateProfile } from '../actions';
import { ToastData } from '~/components/Toast/interface';
import Toast, { Status } from '~/components/Toast';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);
const FormProfile = () => {
    const profileSelector: any = useSelector(profileStore);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [avatar, setAvatar] = useState(Object(null));
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: {
            avatar: '',
            fullName: '',
            gender: '',
            dob: '',
            address: '',
            email: '',
            phone: '',
        },
        validationSchema: updateProfileOptions,
        onSubmit: (values) => {
            setShowToast(true);
            dispatch(updateProfile(values as IProfile));
        },
    });
    // Dispatch get data
    useEffect(() => {
        dispatch(getProfile());
    }, []);

    // Set values when profileSelector change
    useEffect(() => {
        setValues({
            avatar: profileSelector.avatar,
            fullName: profileSelector.fullName,
            gender: profileSelector.gender,
            dob: profileSelector.dob,
            address: profileSelector.address,
            email: profileSelector.email,
            phone: profileSelector.phone,
        });
    }, [profileSelector]);

    // When change avatar
    useEffect(() => {
        return () => {
            avatar.pre && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);
    // onHide Toast
    const hideToast = useCallback(() => {
        setShowToast(false);
    }, []);

    // Toast Options
    const toastOptions: ToastData = useMemo(() => {
        return {
            show: showToast,
            status: Status.success,
            text: 'Cập nhật thành công',
            onHide: hideToast,
        };
    }, [showToast]);
    // Preview Avatar
    const handlePreviewAvatar = (e: any) => {
        const file = e.target.files[0];
        file.pre = URL.createObjectURL(file);
        setAvatar(file);
        setFieldValue('avatar', file.pre);
        e.target.value = null;
    };

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={cx('avatar')}>
                    <div id={cx('wrap-input-image')}>
                        <Tippy animation="fade" placement="bottom" content="Thay ảnh đại diện" duration={[100, 500]}>
                            <label htmlFor="avatar">
                                <img src={avatar.pre || values.avatar} alt="" />
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
                        <label className={cx('form-label')} htmlFor="">
                            Giới tính
                        </label>
                        <div className={cx('form-group')}>
                            <label htmlFor="male">
                                Nam
                                <input
                                    id="male"
                                    name="gender"
                                    value="nam"
                                    className={cx('form-input')}
                                    type="radio"
                                    checked={values.gender === 'nam' || values.gender === 'Nam'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </label>
                            <label htmlFor="female">
                                Nữ
                                <input
                                    id="female"
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
                        <label className={cx('form-label')} htmlFor="phone">
                            Số điện thoại
                        </label>
                        <div className={cx('wrap-input')}>
                            <input
                                id="phone"
                                name="phone"
                                className={cx('form-input')}
                                type="text"
                                value={values.phone}
                                onChange={handleOnChangePhone}
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
                <button type="submit" className={cx('submit-btn')}>
                    Lưu lại
                </button>
            </form>

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default FormProfile;
