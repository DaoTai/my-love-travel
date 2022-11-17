import * as Yup from 'yup';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { formInputs as addUserFormInputs } from '../AddUser/config';
const requiredMsg = 'Vui lòng nhập trường này';
const regexFormatDate =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
// Initial value formik
export const init: Partial<AccountUser> = {
    avatar: '',
    fullName: '',
    dob: '',
    address: 'Thành phố Hà Nội',
    gender: 'Nam',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: '',
    idUser: 0,
    idAccount: 0,
    amountBookedTour: 0,
    joinedTime: '',
};

export const formInputs = [
    { name: 'idUser', type: 'number', label: 'ID User', readOnly: true, disabled: true },
    { name: 'idAccount', type: 'number', label: 'ID Account', readOnly: true, disabled: true },
    { name: 'role', type: 'text', label: 'Vai trò', readOnly: true, disabled: true },
    { name: 'amountBookedTour', type: 'text', label: 'Số tour đã đặt', readOnly: true, disabled: true },
    {
        name: 'joinedTime',
        type: 'text',
        label: 'Ngày tham gia',
        placeholder: 'dd/mm/YYYY',
        readOnly: true,
        disabled: true,
    },
    ...addUserFormInputs,
    { name: 'address', type: 'text', label: 'Địa chỉ' },
];

export const detailUserOptions = Yup.object().shape({
    fullName: Yup.string()
        .required(requiredMsg)
        .trim()
        .matches(/^([^0-9]*)$/, 'Họ tên không hợp lệ'),
    dob: Yup.string().required(requiredMsg).matches(regexFormatDate, 'Ngày sinh không hợp lệ'),
    address: Yup.string().required(requiredMsg).trim(),
    gender: Yup.string().required(requiredMsg),
    email: Yup.string().email('Email không hợp lệ').required(requiredMsg).trim(),
    phone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ')
        .required(requiredMsg)
        .matches(/^\S*$/, 'Vui lòng không để khoảng trắng')
        .matches(/^[0-9\b]+$/, 'Số điện thoại không hợp lệ')
        .trim(),
});
