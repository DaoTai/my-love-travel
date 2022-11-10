import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import className from 'classnames/bind';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { DetailUserProps } from './interface';
import { init, detailUserOptions } from './config';
import { updateUser } from '../actions';
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
            dispatch(updateUser(values));
        },
    });

    // Set value form
    useEffect(() => {
        userRef.current = user;
        setValues({
            avatar: user?.avatar,
            fullName: user?.fullName,
            gender: user?.gender,
            dob: user?.dob,
            address: user?.address,
            email: user?.email,
            phone: user?.phone,
            role: user?.role,
        });
        const handleHide = (e: any) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, [user]);

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

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };

    // Handle reset values
    const handleReset = () => {
        setValues({
            avatar: userRef.current?.avatar,
            fullName: userRef.current?.fullName,
            gender: userRef.current?.gender,
            dob: userRef.current?.dob,
            address: userRef.current?.address,
            email: userRef.current?.email,
            phone: userRef.current?.phone,
            role: userRef.current?.role,
        });
    };
    return (
        <>
            {/* Detail user */}
            <Modal>
                <button id={cx('close-btn')}>
                    <FontAwesomeIcon icon={faClose} onClick={onHide} />
                </button>
                <h1 className={cx('heading')}>Thông tin người dùng</h1>
                {/* Form detail */}
                <form onSubmit={handleSubmit} action="" className={cx('wrap-detail-info')}>
                    <div id={cx('avatar')} className={cx('detail-item')}>
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
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            ID Account:
                        </label>
                        <input type="text" value={user?.idAccount} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            ID User:
                        </label>
                        <input type="text" value={user?.idUser} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Tên tài khoản:
                        </label>
                        <input type="text" value={user?.username} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Vai trò:
                        </label>
                        <input type="text" value={user?.role} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Họ tên:
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            className={cx('detail-value')}
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.fullName && touched.fullName ? errors.fullName : null}
                        </p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày sinh:
                        </label>
                        <input
                            type="text"
                            name="dob"
                            className={cx('detail-value')}
                            value={values.dob}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.dob && touched.dob ? errors.dob : null}</p>
                    </div>
                    <div className={cx('detail-item', 'd-flex  align-items-center')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giới tính:
                        </label>
                        <div className="d-flex justify-content-around">
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
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={cx('detail-value')}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.email && touched.email ? errors.email : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Số điện thoại:
                        </label>
                        <input
                            type="text"
                            name="phone"
                            className={cx('detail-value')}
                            value={values.phone}
                            onChange={handleOnChangePhone}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.phone && touched.phone ? errors.phone : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Địa chỉ:
                        </label>
                        <input
                            type="text"
                            name="address"
                            className={cx('detail-value')}
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.address && touched.address ? errors.address : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày tham gia:
                        </label>
                        <input type="text" name="joinTime" className={cx('detail-value')} value="1/1/2022" readOnly />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Số tour đã đặt:
                        </label>
                        <input type="text" name="bookedTour" className={cx('detail-value')} value="0" readOnly />
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
