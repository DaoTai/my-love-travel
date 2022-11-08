import * as Yup from 'yup';
import Fallback from '~/assets/background-suggestion.jpg';
import { STATUS } from '../constants';
import { Tour } from '~/layouts/components/Tour/interface';

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
};

export const detailTourOptions = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập trường này'),
    place: Yup.string().required('Vui lòng nhập trường này'),
    price: Yup.number().required('Vui lòng nhập trường này'),
    timeStart: Yup.string().required('Vui lòng nhập trường này'),
    hourStart: Yup.string().required('Vui lòng nhập trường này'),
    timeEnd: Yup.string().required('Vui lòng nhập trường này'),
    images: Yup.array().default([Fallback]),
    status: Yup.string().required('Vui lòng nhập trường này').oneOf([STATUS.ACTIVITING, STATUS.ENDING, STATUS.PENDING]),
    limit: Yup.string().required('Vui lòng nhập trường này'),
    currentCustomers: Yup.number().nullable(),
    categories: Yup.array().required('Vui lòng nhập trường này'),
    intro: Yup.string().default('Tour thú vị'),
    utilities: Yup.array().default([]),
});
