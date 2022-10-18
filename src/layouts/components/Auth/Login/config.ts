import * as Yup from 'yup';

export const init = {
    username: '',
    password: '',
};

export const loginOptions = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập trường này'),
    password: Yup.string().required('Vui lòng nhập trường này').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
});
