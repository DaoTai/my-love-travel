import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import { initConfirmAccount, confirmAccountOptions } from '../config';
import { ConfirmAccountData } from './interface';
import Toast, { Status } from '~/components/Toast';
import Spinner from '~/components/Spinner';
import styles from '../styles.module.scss';
const cx = className.bind(styles);
const ConfirmAccount: React.FC = () => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initConfirmAccount,
        validationSchema: confirmAccountOptions,
        onSubmit: (value: ConfirmAccountData) => {
            const { email, phone } = value;
            if (email === 'daoductai24102001@gmail.com' && phone === '0868930418') {
                setShowSpinner(true);
                setTimeout(() => {
                    navigate('/auth/confirm-OTP');
                }, 2500);
            } else {
                setShowToast(true);
            }
        },
    });
    return (
        <>
            <div className={cx('confirm-page')}>
                <form id={cx('form-confirm-account')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Nhập email đã đăng ký"
                            className={cx('form-input')}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className={cx('error-msg')}>{errors.email && touched.email ? errors.email : null}</div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="phone" className={cx('form-label')}>
                            Số điện thoại
                        </label>
                        <input
                            id="phone"
                            type="password"
                            name="phone"
                            placeholder="Nhập số điện thoại  đã đăng ký"
                            className={cx('form-input')}
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className={cx('error-msg')}>{errors.phone && touched.phone ? errors.phone : null}</div>
                    </div>
                    <button type="submit" className={cx('submit-btn')}>
                        Gửi đi
                    </button>
                </form>
            </div>

            {/* Toast */}
            {showToast && (
                <Toast
                    status={Status.warning}
                    show={showToast}
                    title="Thông báo"
                    text="Dữ liệu không tồn tại"
                    onHide={() => setShowToast(false)}
                />
            )}

            {/* Spinner */}
            {showSpinner && <Spinner />}
        </>
    );
};

export default ConfirmAccount;
