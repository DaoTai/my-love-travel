import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import className from 'classnames/bind';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { DetailUserProps } from './interface';
import { init, detailUserOptions, formInputs } from './config';
import { updateUser } from '../actions';
import { AccountUser } from '~/layouts/components/Auth/interface';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import Modal from '~/components/Modal';
import Fallback from '~/assets/fallback.png';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const DetailUser = ({ user, onHide }: DetailUserProps) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(Object(null));
    const [showToast, setShowToast] = useState<boolean>(false);
    const userRef = useRef(Object(null));
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues: init,
        validationSchema: detailUserOptions,
        onSubmit: (values) => {
            setShowToast(true);
            dispatch(
                updateUser({
                    ...user,
                    ...values,
                }),
            );
            console.log({ ...user, ...values });
        },
    });

    // Set value form
    useEffect(() => {
        userRef.current = user;
        setValues(user as Partial<AccountUser>);
        const handleHide = (e: any) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, [user, onHide, setValues]);

    // When change avatar
    useEffect(() => {
        return () => {
            avatar.pre && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);

    const toastOptions: ToastData = useMemo(() => {
        return {
            title: 'Thành công',
            show: showToast,
            status: Status.success,
            text: 'Cập nhật thành công',
            onHide: () => {
                setShowToast(false);
            },
        };
    }, [showToast]);

    // Preview Avatar
    const handlePreviewAvatar = (e: any) => {
        const file = e.target.files[0];
        file.pre = URL.createObjectURL(file);
        setAvatar(file);
        setFieldValue('avatar', file.pre);
        e.target.value = null;
    };
    // Handle reset values
    const handleReset = () => {
        setValues(userRef.current);
    };
    return (
        <>
            {/* Detail user */}
            <Modal title="Thông tin người dùng">
                <button id={cx('close-btn')}>
                    <FontAwesomeIcon icon={faClose} onClick={onHide} />
                </button>
                {/* Form detail */}
                <form onSubmit={handleSubmit} action="" className={cx('wrap-detail-info')}>
                    {/* Avatar */}
                    <div id={cx('avatar')} className={cx('detail-item-wrap')}>
                        <Tippy animation="fade" placement="right" content="Thay ảnh đại diện" duration={[100, 500]}>
                            <label htmlFor="avatar-input">
                                <img
                                    srcSet={values.avatar || Fallback}
                                    alt="avatar-user"
                                    className={cx('avatar-user')}
                                />
                            </label>
                        </Tippy>
                        <input
                            id="avatar-input"
                            hidden
                            type="file"
                            className={cx('detail-value')}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handlePreviewAvatar}
                        />
                    </div>
                    {/* Inputs */}
                    {formInputs.map((input: any, i) => {
                        const nameInput = input.name as keyof AccountUser;
                        return (
                            <div key={i} className={cx('detail-item-wrap')}>
                                <div className={cx('detail-item')}>
                                    <label htmlFor="" className={cx('detail-label')}>
                                        {input.label}
                                    </label>
                                    <input
                                        type={input.type}
                                        name={nameInput}
                                        className={cx('detail-value')}
                                        readOnly={input.readOnly}
                                        disabled={input.disabled}
                                        value={values[nameInput]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <p className={cx('error-msg')}>
                                    {errors[nameInput] && touched[nameInput] ? errors[nameInput] : null}
                                </p>
                            </div>
                        );
                    })}
                    {/* Gender inputs */}
                    <div className={cx('detail-item-wrap', 'd-flex align-items-center')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giới tính:
                        </label>
                        <div className={cx('detail-value', 'd-flex')}>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    onChange={handleChange}
                                    checked={values.gender === 'Nam'}
                                    value="Nam"
                                    name="gender"
                                    className={cx('detail-value')}
                                />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    onChange={handleChange}
                                    checked={values.gender === 'Nữ'}
                                    value="Nữ"
                                    name="gender"
                                    className={cx('detail-value')}
                                />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                        <p className={cx('error-msg')}>{errors.gender && touched.gender ? errors.gender : null}</p>
                    </div>
                    {/* Wrap buttons */}
                    <div className={cx('wrap-btns')}>
                        <button type="button" id={cx('btn-reset')} onClick={handleReset}>
                            Hoàn tác
                            <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
                        <button type="submit" id={cx('btn-update')}>
                            Lưu lại
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default DetailUser;
