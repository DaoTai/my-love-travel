import { forwardRef, useState, useMemo, useCallback, useImperativeHandle, useId } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import { init, newPasswordOptions, formInputs } from './config';
import { NewPasswordData } from './interface';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import Modal from '~/components/Modal';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);
const NewPassword = (props: any, ref: any) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const id = useId();
    const [showNewPasswordModal, setShowNewPasswordModal] = useState<boolean>(false);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: init,
        validationSchema: newPasswordOptions,
        onSubmit: (values, e) => {
            setShowToast(true);
            const sendData: NewPasswordData = {
                phone: values.phone,
                email: values.email,
                newPassword: values.newPassword,
            };
            handleReset(e);
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
    }, [showToast, hideToast]);

    useImperativeHandle(ref, () => ({
        showNewPasswordModal,
        handleShowModal,
    }));

    // Show newpassword modal
    const handleShowModal = () => {
        setShowNewPasswordModal(true);
    };

    // Show newpassword modal
    const hideModal = () => {
        setShowNewPasswordModal(false);
    };

    return (
        <>
            {/* Modal */}
            {showNewPasswordModal && (
                <Modal title="Đổi mật khẩu" size="small">
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {formInputs.map((input, i) => {
                            const nameInput = input.name as keyof NewPasswordData;
                            return (
                                <div key={i} className={cx('form-group')}>
                                    <label className={cx('form-label')} htmlFor={input.name + id}>
                                        {input.label}:
                                    </label>
                                    <div className={cx('wrap-input')}>
                                        <input
                                            id={input.name + id}
                                            name={input.name}
                                            className={cx('form-input')}
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
