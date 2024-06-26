import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { init, registerOptions, formInputs } from './config';
import { addUser } from '../actions';
import { vietNamProvinces } from '~/apis/auth';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import { Register } from '~/layouts/components/Auth/interface';
import Modal from '~/components/Modal';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const AccountCreator = ({ isOpen, onHide }: { isOpen: boolean; onHide: () => void }) => {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState<boolean>(false);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues, handleReset } =
        useFormik({
            initialValues: init,
            validationSchema: registerOptions,
            onSubmit: (values, e) => {
                setShowToast(true);
                dispatch(
                    addUser({
                        ...values,
                        idUser: 333,
                        idAccount: 333,
                    }),
                );
                handleReset(e);
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
    }, [showToast, selectedType]);
    // Fetch api provinces
    useEffect(() => {
        const fetchApi = async () => {
            const result = await vietNamProvinces();
            setProvinces(result);
        };
        fetchApi();
        setFieldValue('role', selectedType);
        const handleKeyDown = (e: KeyboardEvent) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Register role
    const handleSetRole = (role: string) => {
        setFieldValue('role', role);
        setSelectedType(role);
        setShowSelectTypes(false);
    };

    return (
        <>
            {isOpen && (
                <Modal title="Thêm người dùng">
                    <div id={cx('account-creator')}>
                        <button id={cx('close-btn')}>
                            <FontAwesomeIcon icon={faClose} onClick={onHide} />
                        </button>
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
                            {formInputs.map((input, i) => {
                                const nameInput = input.name as keyof Register;
                                return (
                                    <div key={i} className={cx('form-group')}>
                                        <label className={cx('form-label')} htmlFor="">
                                            {input.label}
                                        </label>
                                        <input
                                            id={nameInput}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={nameInput}
                                            value={values[nameInput]}
                                            className={cx('form-input')}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className={cx('error-msg')}>
                                            {errors[nameInput] && touched[nameInput] ? errors[nameInput] : null}
                                        </p>
                                    </div>
                                );
                            })}
                            {/* ==================================== */}
                            <div className={cx('form-group')}>
                                <label className={cx('form-label')} htmlFor="">
                                    Địa chỉ:
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
                                    Giới tính:
                                </label>
                                <div>
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
                                <p className={cx('error-msg')}>
                                    {errors.gender && touched.gender ? errors.gender : null}
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
                </Modal>
            )}

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default AccountCreator;
