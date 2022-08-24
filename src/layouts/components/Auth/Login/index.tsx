import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Vui lòng nhập trường này'),
            password: Yup.string().required('Vui lòng nhập trường này').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    return (
        <div id={cx('login')}>
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Love Travel</h1>
                <h2 className={cx('sub-heading')}>Đăng nhập</h2>
                <form onSubmit={handleSubmit} className={cx('login-form')} action="">
                    <div className={cx('form-group')}>
                        <input
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            type="text"
                            onBlur={handleBlur}
                            placeholder="Tên đăng nhập"
                            spellCheck={false}
                            className={cx('form-input')}
                        />
                        <label htmlFor="">Tên đăng nhập</label>
                        <p className={cx('error-msg')}>
                            {errors.username && touched.username ? errors.username : null}
                        </p>
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            placeholder="Mật khẩu"
                            className={cx('form-input')}
                        />
                        <label htmlFor="">Mật khẩu</label>
                        <p className={cx('error-msg')}>
                            {' '}
                            {errors.password && touched.password ? errors.password : null}
                        </p>
                    </div>
                    <button type="submit" className={cx('submit-btn')}>
                        Đăng nhập
                    </button>
                </form>
                <div className="d-flex justify-content-between">
                    <Link to="/auth/register">Đăng ký</Link>
                    {/* <a href="/">Quên mật khẩu</a> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
