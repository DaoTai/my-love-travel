import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { AuthContext } from '~/Contexts';
import { Auth } from '~/Contexts/interface';
import Spinner from '~/components/Spinner';
import styles from './styles.module.scss';
import { init, loginOptions } from './config';
const cx = classNames.bind(styles);

const user: Auth = {
    id: '123',
    username: 'Đào Tài',
    role: 'user',
};

const Login: React.FC = () => {
    const context = useContext(AuthContext);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: init,
        validationSchema: loginOptions,
        onSubmit: (values) => {
            setShowSpinner(true);
            setTimeout(() => {
                context?.setAuth(user);
                localStorage.setItem('account', JSON.stringify(user));
                setShowSpinner(false);
                navigate('/home');
            }, 3000);
        },
    });

    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    return (
        <div id={cx('login')}>
            {showSpinner && <Spinner />}
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Love Travel</h1>
                <h2 className={cx('sub-heading')}>Đăng nhập</h2>
                {/* Form */}
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
