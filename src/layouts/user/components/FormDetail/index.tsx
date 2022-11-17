import { useState, useEffect, useCallback, useMemo } from 'react';
import Tippy from '@tippyjs/react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { updateProfileOptions, init, formInputs } from '~/layouts/user/pages/Profile/config';
import { Profile as IProfile, NameOfKeyProfileInput } from '~/layouts/user/pages/Profile/interface';
import { profileSelector as profileStore } from '~/layouts/user/pages/Profile/selectors';
import { getProfile, updateProfile } from '~/layouts/user/pages/Profile/actions';
import { ToastData } from '~/components/Toast/interface';
import Toast, { Status } from '~/components/Toast';
import styles from '~/layouts/user/pages/Profile/styles.module.scss';
const cx = classNames.bind(styles);
const FormProfile = () => {
    const profile = useSelector(profileStore);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [avatar, setAvatar] = useState(Object(null));
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: init,
        validationSchema: updateProfileOptions,
        onSubmit: (values) => {
            setShowToast(true);
            dispatch(updateProfile(values as IProfile));
        },
    });
    // Dispatch get data
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    // Set values when profileSelector change
    useEffect(() => {
        setValues(profile as IProfile);
    }, [profile, setValues, dispatch]);

    // When change avatar
    useEffect(() => {
        return () => {
            avatar.pre && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar, dispatch]);
    // onHide Toast
    const hideToast = () => {
        setShowToast(false);
    };
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

    return (
        <>
            <form id={cx('form-profile')} onSubmit={handleSubmit}>
                {/* Avatar */}
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
                    {formInputs.map((input, i) => {
                        const nameInput = input.name as keyof NameOfKeyProfileInput;
                        return (
                            <div key={i} className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor={input.name}>
                                    {input.label}
                                </label>
                                <div className={cx('wrap-input')}>
                                    <input
                                        id={input.name}
                                        name={input.name}
                                        className={cx('form-input')}
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        value={values[nameInput]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p className={cx('error-msg')}>
                                        {errors[nameInput] && touched[nameInput] ? errors[nameInput] : null}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Gender */}
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Giới tính:
                        </label>
                        <div className={cx('form-group')}>
                            <label htmlFor="male">
                                Nam
                                <input
                                    id="male"
                                    name="gender"
                                    value="Nam"
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
                                    value="Nữ"
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
