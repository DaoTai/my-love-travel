import * as Yup from 'yup';
import { Register as RegisterData } from '../interface';

// Initial value formik
export const init: RegisterData = {
    name: '',
    dob: '',
    address: 'Thành phố Hà Nội',
    gender: 'Nam',
    email: '',
    phone: '',
    username: '',
    password: '',
    repassword: '',
};

export const registerOptions = Yup.object().shape({
    name: Yup.string()
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
    username: Yup.string().required('Vui lòng nhập trường này').trim(),
    password: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .min(6, 'Vui lòng nhập tối thiểu 6 ký tự')
        .trim(),
    repassword: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
        .trim(),
});
