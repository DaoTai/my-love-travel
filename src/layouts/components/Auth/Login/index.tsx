import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import { AuthContext } from '~/Contexts';
import { Auth } from '~/Contexts/interface';
import Spinner from '~/components/Spinner';
import styles from './styles.module.scss';
import { init, loginOptions } from './config';
const cx = classNames.bind(styles);

const user: Auth = {
    id: '123',
    username: 'user123',
    role: 'user',
};

const admin: Auth = {
    id: '12',
    username: 'admin123',
    role: 'admin',
};

const Login: React.FC = () => {
    const context = useContext(AuthContext);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: init,
        validationSchema: loginOptions,
        onSubmit: (values) => {
            console.log(values);
            if (values.username === 'user123') {
                context?.setAuth(user);
                localStorage.setItem('account', JSON.stringify(user));
            } else {
                if (values.username === 'admin123') {
                    context?.setAuth(admin);
                    localStorage.setItem('account', JSON.stringify(admin));
                } else {
                    console.log('Hello');
                }
            }
            setShowSpinner(true);
            setTimeout(() => {
                setShowSpinner(false);
                if (context.auth?.role === 'admin') {
                    navigate('/admin');
                } else {
                    if (context.auth?.role === 'user') {
                        navigate('/home');
                    } else {
                        console.log(context.auth?.role);
                    }
                }
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
                {/* <h2 className={cx('sub-heading')}>Đăng nhập</h2> */}
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
                    <Link to="/auth/confirm-account">Quên mật khẩu</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
