import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { init, registerOptions } from './config';
import { addUser } from '../ManageUsers/actions';
import { vietNamProvinces } from '~/apis/auth';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const AccountCreator = () => {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState<boolean>(false);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues, handleReset } =
        useFormik({
            initialValues: init,
            validationSchema: registerOptions,
            onSubmit: (values) => {
                setShowToast(true);
                dispatch(
                    addUser({
                        ...values,
                        idUser: 333,
                        idAccount: 333,
                    }),
                );
            },
        });
    const [provinces, setProvinces] = useState([{ name: '' }]);
    const [showSelectTypes, setShowSelectTypes] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('Khách hàng');
    const toastOptions: ToastData = useMemo(() => {
        return {
            title: 'Thành công',
            show: showToast,
            status: Status.success,
            text: `Thêm ${selectedType} thành công`,
            onHide: () => {
                setShowToast(false);
            },
        };
    }, [showToast]);
    // Fetch api provinces
    useEffect(() => {
        const fetchApi = async () => {
            const result = await vietNamProvinces();
            setProvinces(result);
        };
        fetchApi();
        setFieldValue('role', selectedType);
    }, []);

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };

    // Register role
    const handleSetRole = (role: string) => {
        setFieldValue('role', role);
        setSelectedType(role);
        setShowSelectTypes(false);
    };

    return (
        <>
            <div id={cx('account-creator')}>
                {/* Select role */}
                <div className="d-flex justify-content-between">
                    <div>
                        <HeadlessTippy
                            placement="bottom"
                            interactive
                            visible={showSelectTypes}
                            onClickOutside={() => setShowSelectTypes(false)}
                            render={(attrs) => (
                                <ul className={cx('list-type-select')} {...attrs}>
                                    <li className={cx('type')} onClick={() => handleSetRole('Khách hàng')}>
                                        Khách hàng
                                    </li>
                                    <li className={cx('type')} onClick={() => handleSetRole('Admin')}>
                                        Admin
                                    </li>
                                    <li className={cx('type')} onClick={() => handleSetRole('Người dẫn tour')}>
                                        Người dẫn tour
                                    </li>
                                </ul>
                            )}
                        >
                            <button
                                className={cx('btn-show-options')}
                                onClick={() => setShowSelectTypes(!showSelectTypes)}
                            >
                                <span>{selectedType}</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </HeadlessTippy>
                    </div>
                    <Tippy animation="fade" placement="left" content="Hoàn tác">
                        <button id={cx('reset-btn')} onClick={handleReset}>
                            <FontAwesomeIcon icon={faUndo} />
                        </button>
                    </Tippy>
                </div>
                {/* Form */}

                <form className={cx('register-form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Họ tên
                        </label>
                        <input
                            type="text"
                            placeholder="VD: Đào Đức Tài"
                            name="fullName"
                            value={values.fullName}
                            className={cx('form-input')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.fullName && touched.fullName ? errors.fullName : null}
                        </p>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Ngày sinh
                        </label>
                        <input
                            type="text"
                            name="dob"
                            placeholder="dd/mm/YYYY"
                            value={values.dob}
                            className={cx('form-input')}
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
                        <p className={cx('error-msg')}>{errors.address && touched.address ? errors.address : null}</p>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Giới tính
                        </label>
                        <div className="d-flex justify-content-around">
                            <div>
                                <input
                                    id="male"
                                    type="radio"
                                    checked={values.gender === 'Nam'}
                                    value="Nam"
                                    name="gender"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div>
                                <input
                                    id="female"
                                    type="radio"
                                    checked={values.gender === 'Nữ'}
                                    value="Nữ"
                                    name="gender"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                        <p className={cx('error-msg')}>{errors.gender && touched.gender ? errors.gender : null}</p>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="VD: travel24@gmail.com"
                            name="email"
                            value={values.email}
                            className={cx('form-input')}
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
                            placeholder="Số điện thoại"
                            name="phone"
                            value={values.phone}
                            className={cx('form-input')}
                            onChange={handleOnChangePhone}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.phone && touched.phone ? errors.phone : null}</p>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            name="username"
                            className={cx('form-input')}
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.password && touched.password ? errors.password : null}
                        </p>
                    </div>

                    <div className={cx('wrap-btns')}>
                        <button type="submit" id={cx('submit-btn')}>
                            Đăng ký
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default AccountCreator;
