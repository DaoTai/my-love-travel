import * as Yup from 'yup';

export const init = {
    email: '',
    phone: '',
    password: '',
    newPassword: '',
    newPasswordValidation: '',
};

export const newPasswordOptions = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này'),
    phone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .trim(),
    password: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .min(6, 'Vui lòng nhập tối thiểu 6 ký tự')
        .trim(),
    newPassword: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .notOneOf([Yup.ref('password')], 'Mật khẩu mới không hợp lệ')
        .min(6, 'Vui lòng nhập tối thiểu 6 ký tự')
        .trim(),
    newPasswordValidation: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu mới không khớp')
        .trim(),
});
