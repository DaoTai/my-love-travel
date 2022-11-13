import { forwardRef, useState, useMemo, useCallback, useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import { init, newPasswordOptions } from './config';
import { NewPasswordData } from './interface';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import Modal from '~/components/Modal';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);
const NewPassword = (props: any, ref: any) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showNewPasswordModal, setshowNewPasswordModal] = useState<boolean>(ref ? false : true);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: init,
        validationSchema: newPasswordOptions,
        onSubmit: (values) => {
            setShowToast(true);
            const sendData: NewPasswordData = {
                phone: values.phone,
                email: values.email,
                newPassword: values.newPassword,
            };
            console.log('Data send: ', sendData);
        },
    });
    // Hide toast
    const hideToast = useCallback(() => {
        setShowToast(false);
    }, []);

    //toastOptions: Chưa xử lý khi response 404
    const toastOptions: ToastData = useMemo(() => {
        return {
            show: showToast,
            status: Status.success,
            text: 'Đổi mật khẩu thành công',
            onHide: hideToast,
        };
    }, [showToast]);

    useImperativeHandle(ref, () => ({
        showNewPasswordModal,
        handleShowModal,
    }));

    // Show newpassword modal
    const handleShowModal = () => {
        setshowNewPasswordModal(true);
    };

    // Show newpassword modal
    const hideModal = useCallback(() => {
        setshowNewPasswordModal(false);
    }, []);

    return (
        <>
            {showNewPasswordModal && (
                <Modal>
                    {/* Modal */}
                    {/* Title */}
                    <h1 className={cx('heading')}>Đổi mật khẩu</h1>
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="confirmedEmail">
                                Email:
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="confirmedEmail"
                                    name="email"
                                    className={cx('form-input')}
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="confirmedPhone">
                                Số điện thoại:
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="confirmedPhone"
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

                        {/* Old password */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="password">
                                Mật khẩu cũ:
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="password"
                                    name="password"
                                    className={cx('form-input')}
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.password && touched.password ? errors.password : null}
                                </p>
                            </div>
                        </div>

                        {/* New password */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="newPassword">
                                Mật khẩu mới:
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    className={cx('form-input')}
                                    type="password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                </p>
                            </div>
                        </div>

                        {/* Validation new password */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="newPasswordValidation">
                                Xác nhận mật khẩu mới:
                            </label>
                            <div className={cx('wrap-input')}>
                                <input
                                    id="newPasswordValidation"
                                    name="newPasswordValidation"
                                    className={cx('form-input')}
                                    type="password"
                                    value={values.newPasswordValidation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.newPasswordValidation && touched.newPasswordValidation
                                        ? errors.newPasswordValidation
                                        : null}
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <button className={cx('submit-btn')} id="submit" type="submit"></button>
                    </form>
                    <div className={cx('wrap-btns')}>
                        <label className={cx('cancel-btn')} onClick={hideModal}>
                            Huỷ
                        </label>
                        <label className={cx('btn')} htmlFor="submit">
                            Xác nhận
                        </label>
                    </div>
                    {/* Toast */}
                </Modal>
            )}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default forwardRef(NewPassword);
