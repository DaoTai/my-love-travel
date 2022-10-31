import * as Yup from 'yup';

export const initConfirmAccount = {
    email: '',
    phone: '',
};

export const confirmAccountOptions = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này'),
    phone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .trim(),
});

export const initOTP = {
    otp: '',
};

export const OTPOption = Yup.object().shape({
    otp: Yup.string().required('Mã OTP không được trống').matches(/^\S*$/, 'Vui lòng không để khoảng trắng').trim(),
});
