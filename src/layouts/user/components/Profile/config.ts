import * as Yup from 'yup';

export const updateProfileOptions = Yup.object().shape({
    fullName: Yup.string()
        .required('Vui lòng nhập trường này')
        .trim()
        .matches(/^([^0-9]*)$/, 'Họ tên không hợp lệ'),
    dob: Yup.string().required('Vui lòng nhập trường này'),
    address: Yup.string().required('Vui lòng nhập trường này').trim(),
    gender: Yup.string().required('Vui lòng nhập trường này'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này').trim(),
    phone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .trim(),
});
