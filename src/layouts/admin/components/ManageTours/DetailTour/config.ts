import * as Yup from 'yup';
import Fallback from '~/assets/background-suggestion.jpg';
import { STATUS } from '../constants';
import { Tour } from '~/layouts/components/Tour/interface';

const regexFormatDate =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

// Initial value formik
export const init: Partial<Tour> = {
    id: 0,
    name: '',
    place: '',
    price: 1350000,
    timeStart: '',
    hourStart: '9h45',
    timeEnd: '',
    images: [],
    status: 'Pending',
    limit: 50,
    currentCustomers: 0,
    categories: [],
    intro: '',
    utilities: [],
    guide: '',
};

export const detailTourOptions = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập trường này'),
    guide: Yup.string(),
    place: Yup.string().required('Vui lòng nhập trường này'),
    price: Yup.number().required('Vui lòng nhập trường này'),
    timeStart: Yup.string().required('Vui lòng nhập trường này').matches(regexFormatDate, 'Giá trị không hợp lệ'),
    timeEnd: Yup.string().required('Vui lòng nhập trường này').matches(regexFormatDate, 'Giá trị không hợp lệ'),
    hourStart: Yup.string().required('Vui lòng nhập trường này'),
    images: Yup.array().default([Fallback]),
    status: Yup.string().required('Vui lòng nhập trường này').oneOf([STATUS.ACTIVITING, STATUS.ENDING, STATUS.PENDING]),
    limit: Yup.string().required('Vui lòng nhập trường này'),
    currentCustomers: Yup.number().nullable(),
    categories: Yup.array().required('Vui lòng nhập trường này'),
    intro: Yup.string().default('Tour thú vị'),
    utilities: Yup.array().default([]),
});

export const statuses = [STATUS.ACTIVITING, STATUS.PENDING, STATUS.ENDING];

export const categories = ['Di tích lịch sử', 'Sinh thái', 'Nghỉ dưỡng'];
