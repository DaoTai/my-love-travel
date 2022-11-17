import * as Yup from 'yup';
import { Register as RegisterData } from '~/layouts/components/Auth/interface';
const regexFormatDate =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
// Initial value formik
export const init: Partial<RegisterData> = {
    fullName: '',
    dob: '',
    address: 'Thành phố Hà Nội',
    gender: 'Nam',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: '',
};

export const formInputs = [
    { name: 'fullName', type: 'text', label: 'Họ tên', placeholder: 'VD: Đào Tài' },
    { name: 'dob', type: 'text', label: 'Ngày sinh', placeholder: 'dd/mm/YYYY' },
    { name: 'email', type: 'email', label: 'Email', placeholder: 'VD: bdt11@gmail.com' },
    { name: 'phone', type: 'text', label: 'Số điện thoại', placeholder: 'Nhập số điện thoại' },
    { name: 'username', type: 'text', label: 'Tên đăng nhập', placeholder: 'Nhập tên đăng nhập' },
    { name: 'password', type: 'password', label: 'Mật khẩu', placeholder: 'Mật khẩu tối thiểu 6 ký tự' },
];

export const registerOptions = Yup.object().shape({
    fullName: Yup.string()
        .required('Vui lòng nhập trường này')
        .trim()
        .matches(/^([^0-9]*)$/, 'Họ tên không hợp lệ'),
    dob: Yup.string().required('Vui lòng nhập trường này').matches(regexFormatDate, 'Ngày sinh không hợp lệ'),
    address: Yup.string().required('Vui lòng nhập trường này').trim(),
    gender: Yup.string().required('Vui lòng nhập trường này'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này').trim(),
    phone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .matches(/^[0-9\b]+$/, 'Số điện thoại không hợp lệ')
        .trim(),
    username: Yup.string().required('Vui lòng nhập trường này').trim(),
    password: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .min(6, 'Vui lòng nhập tối thiểu 6 ký tự')
        .trim(),
});
