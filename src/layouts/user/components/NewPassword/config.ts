import * as Yup from 'yup';

export const init = {
    email: '',
    phone: '',
    password: '',
    newPassword: '',
    newPasswordValidation: '',
};

export const formInputs = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Mật khẩu cũ' },
    { name: 'newPassword', type: 'password', label: 'Mật khẩu mới' },
    { name: 'newPasswordValidation', type: 'password', label: 'Xác nhận mật khẩu mới' },
];

export const newPasswordOptions = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này'),
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
