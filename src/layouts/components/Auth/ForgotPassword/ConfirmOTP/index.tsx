import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { useFormik } from 'formik';
import { initOTP, OTPOption } from '../config';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import { OTPData } from './interface';
import styles from '../styles.module.scss';
const cx = className.bind(styles);
const ConfirmOTP: React.FC = () => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [checkOTP, setCheckOTP] = useState<boolean>(false);
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initOTP,
        validationSchema: OTPOption,
        onSubmit: (value: OTPData) => {
            setShowToast(true);
            const { otp } = value;
            otp === '123123' ? setCheckOTP(true) : setCheckOTP(false);
        },
    });
    // Toast Options
    const toastOptions: ToastData = useMemo(() => {
        if (checkOTP) {
            return {
                title: 'Thành công',
                show: showToast,
                status: Status.success,
                text: 'Mật khẩu mới sắp được gửi',
                onHide: () => {
                    setShowToast(false);
                },
            };
        } else {
            return {
                title: 'Thất bại',
                show: showToast,
                status: Status.error,
                text: `Mã OTP không chính xác`,
                onHide: () => {
                    setShowToast(false);
                },
            };
        }
    }, [showToast, checkOTP]);
    return (
        <>
            <div className={cx('confirm-page')}>
                <form id={cx('form-confirm-account')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="otp" className={cx('form-label')}>
                            Mã OTP (Có hiệu lực trong 60 giây)
                        </label>
                        <input
                            id="otp"
                            type="text"
                            name="otp"
                            placeholder="Nhập mã OTP"
                            className={cx('form-input')}
                            value={values.otp}
                            onChange={handleChange}
                        />
                        <div className={cx('error-msg')}>{errors.otp && touched.otp ? errors.otp : null}</div>
                    </div>
                    <button type="submit" className={cx('submit-btn')} disabled={showToast}>
                        Xác nhận
                    </button>
                    <Link to="/auth/login">Đăng nhập</Link>
                </form>
            </div>

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default ConfirmOTP;
