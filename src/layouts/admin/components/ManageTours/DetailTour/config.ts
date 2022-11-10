import * as Yup from 'yup';
import Fallback from '~/assets/fallback.png';
import { STATUS } from '../constants';
import { Tour } from '~/layouts/components/Tour/interface';

const regexFormatDate =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
const requiredMsg = 'Vui lòng nhập trường này';
const invalidMsg = 'Giá trị không hợp lệ';
// Initial value formik
export const init: Partial<Tour> = {
    id: -1,
    name: '',
    place: '',
    price: 300000,
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
    name: Yup.string().required(requiredMsg),
    guide: Yup.string(),
    place: Yup.string().required(requiredMsg),
    price: Yup.number().required(requiredMsg).positive(invalidMsg),
    timeStart: Yup.string().required(requiredMsg).matches(regexFormatDate, invalidMsg),
    timeEnd: Yup.string().required(requiredMsg).matches(regexFormatDate, invalidMsg),
    hourStart: Yup.string().required(requiredMsg),
    status: Yup.string().required(requiredMsg).oneOf([STATUS.ACTIVITING, STATUS.ENDING, STATUS.PENDING]),
    limit: Yup.number().required(requiredMsg).positive(invalidMsg),
    currentCustomers: Yup.number().nullable().min(0, invalidMsg),
    intro: Yup.string().required(requiredMsg),
    images: Yup.array().default([Fallback]),
    categories: Yup.array().min(1, requiredMsg),
    utilities: Yup.array().default([]),
});

export const statuses = [STATUS.ACTIVITING, STATUS.PENDING, STATUS.ENDING];

export const categories = ['Di tích lịch sử', 'Sinh thái khám phá', 'Nghỉ dưỡng'];
