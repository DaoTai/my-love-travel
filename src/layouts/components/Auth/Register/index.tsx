import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import { Register as RegisterData } from '../interface';
import { vietNamProvinces, requestRegister } from '~/apis/auth';
import Toast from '~/components/Toast';
import { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import style from './styles.module.scss';
const cx = classNames.bind(style);

// Initial value formik
const init: RegisterData = {
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

const Register = () => {
    const [provinces, setProvinces] = useState<any[]>([{ name: '' }]);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [contentToast, setContentToast] = useState<Partial<ToastData>>({
        status: Status.success,
        text: 'Đăng ký thành công',
    });

    // Fetch api provinces
    useEffect(() => {
        document.title = 'Đăng ký';
        const fetchApi = async () => {
            const result = await vietNamProvinces();
            setProvinces(result);
        };
        fetchApi();
    }, []);

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };

    const hideToast = () => {
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: init,
        validationSchema: Yup.object().shape({
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
        }),
        onSubmit: (values) => {
            // Call API
            const submitRegister = async () => {
                try {
                    const res: any = await requestRegister(values);
                    if (res.status === 201) {
                        console.log('Đăng ký thành công');
                        setShowToast(true);
                        setContentToast({ status: Status.success, text: 'Đăng ký thành công' });
                        hideToast();
                    } else {
                        setShowToast(true);
                        setContentToast({ status: Status.error, title: 'Thất bại', text: res.response.data.error });
                        hideToast();
                    }
                } catch (err) {
                    setShowToast(true);
                    setContentToast({ status: Status.success, title: 'Thất bại', text: 'Máy chủ không phản hồi' });
                    hideToast();
                }
            };

            // Send request
            submitRegister();
        },
    });

    return (
        <>
            {/* Toast */}
            {showToast && <Toast {...contentToast} />}
            {/* Register  */}
            <div id={cx('register')}>
                <div className={cx('container')}>
                    <div className={cx('wrap-intro')}>
                        <h1 className={cx('heading')}>Love Travel</h1>
                        <Link to="/auth/login">Đăng nhập</Link>
                    </div>

                    {/* Form register */}
                    <div className={cx('wrap-register-form')}>
                        <h2 className={cx('sub-heading')}>Đăng ký</h2>
                        <form onSubmit={handleSubmit} className={cx('register-form')}>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    placeholder="VD: Đào Đức Tài"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={cx('form-input')}
                                />
                                <p className={cx('error-msg')}>{errors.name && touched.name ? errors.name : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    className={cx('form-input')}
                                    value={values.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.dob && touched.dob ? errors.dob : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Địa chỉ
                                </label>
                                <select
                                    name="address"
                                    className={cx('form-input')}
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {provinces?.map((province, i) => {
                                        return (
                                            <option key={i} value={province.name}>
                                                {province.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p className={cx('error-msg')}>
                                    {errors.address && touched.address ? errors.address : null}
                                </p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Giới tính
                                </label>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <input
                                            type="radio"
                                            onChange={handleChange}
                                            checked={values.gender === 'Nam'}
                                            value="Nam"
                                            name="gender"
                                        />
                                        Nam
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            onChange={handleChange}
                                            checked={values.gender === 'Nữ'}
                                            value="Nữ"
                                            name="gender"
                                        />
                                        Nữ
                                    </div>
                                </div>
                                <p className={cx('error-msg')}>
                                    {errors.gender && touched.gender ? errors.gender : null}
                                </p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="VD: travel24@gmail.com"
                                    name="email"
                                    className={cx('form-input')}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleOnChangePhone(e)}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    className={cx('form-input')}
                                />
                                <p className={cx('error-msg')}>{errors.phone && touched.phone ? errors.phone : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder="Tên đăng nhập"
                                    name="username"
                                    className={cx('form-input')}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.username && touched.username ? errors.username : null}
                                </p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu tối thiểu 6 ký tự"
                                    name="password"
                                    className={cx('form-input')}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.password && touched.password ? errors.password : null}
                                </p>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    name="repassword"
                                    className={cx('form-input')}
                                    value={values.repassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className={cx('error-msg')}>
                                    {errors.repassword && touched.repassword ? errors.repassword : null}
                                </p>
                            </div>

                            <button type="submit" className={cx('submit-btn')}>
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
