import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './styles.module.scss';

// Không thể sử dụng trùng field khi sử dụng useFormik trong tất cả Component
const init = {
    fullname: '',
    dob: '',
    address: '',
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    repassword: '',
};

const cx = classNames.bind(style);
const Register = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: init,
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required('Vui lòng nhập trường này').trim(),
            dob: Yup.string().required('Vui lòng nhập trường này'),
            address: Yup.string().required('Vui lòng nhập trường này').trim(),
            gender: Yup.string().required('Vui lòng nhập trường này'),
            email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập trường này').trim(),
            phone: Yup.string()
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
            console.log(values);
        },
    });

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };
    return (
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
                                name="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx('form-input')}
                            />
                            <p className={cx('error-msg')}>{errors.fullname || touched.fullname}</p>
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
                            <p className={cx('error-msg')}>{errors.dob || touched.dob}</p>
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
                                <option value="">--Lựa chọn --</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                            </select>
                            <p className={cx('error-msg')}>{errors.address || touched.address}</p>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')} htmlFor="">
                                Giới tính
                            </label>
                            <div className="d-flex justify-content-evenly">
                                <div>
                                    <input type="radio" onChange={handleChange} value="male" name="gender" />
                                    Nam
                                </div>
                                <div>
                                    <input type="radio" onChange={handleChange} value="female" name="gender" />
                                    Nữ
                                </div>
                            </div>
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
                            <p className={cx('error-msg')}>{errors.email || touched.email}</p>
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
                            <p className={cx('error-msg')}>{errors.phone || touched.phone}</p>
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
                            <p className={cx('error-msg')}>{errors.username || touched.username}</p>
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
                            <p className={cx('error-msg')}>{errors.password || touched.password}</p>
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
                            <p className={cx('error-msg')}>{errors.repassword || touched.repassword}</p>
                        </div>

                        <button type="submit" className={cx('submit-btn')}>
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
