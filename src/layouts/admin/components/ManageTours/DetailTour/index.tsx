import { memo, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import className from 'classnames/bind';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { DetailTourProps } from './interface';
import { init, detailTourOptions } from './config';
import { updateTour } from '../actions';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import Modal from '~/components/Modal';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
import { tours } from '~/data';
const cx = className.bind(styles);
const DetailTour = ({ tour, onHide }: DetailTourProps) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(Object(null));
    const [showToast, setShowToast] = useState<boolean>(false);
    const tourRef = useRef(Object(null));
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues: init,
        validationSchema: detailTourOptions,
        onSubmit: (values) => {
            setShowToast(true);
            // dispatch(updateTour(values));
        },
    });

    // Set value form
    useEffect(() => {
        console.log('Tour:', tour);

        tourRef.current = tour;
        setValues({
            id: tour?.id,
            name: tour?.name,
            place: tour?.place,
            price: tour?.price,
            timeStart: tour?.timeStart,
            hourStart: tour?.hourStart,
            timeEnd: tour?.timeEnd,
            images: tour?.images,
            status: tour?.status,
            limit: tour?.limit,
            currentCustomers: tour?.currentCustomers,
            categories: tour?.categories,
            intro: tour?.intro,
            utilities: tour?.utilities,
        });
        const handleHide = (e: any) => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleHide);
        return () => {
            window.removeEventListener('keydown', handleHide);
        };
    }, [tour]);

    // When change avatar
    // useEffect(() => {
    //     return () => {
    //         avatar.pre && URL.revokeObjectURL(avatar.pre);
    //     };
    // }, [avatar]);

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
    // const handlePreviewAvatar = (e: any) => {
    //     const file = e.target.files[0];
    //     file.pre = URL.createObjectURL(file);
    //     setAvatar(file);
    //     setFieldValue('avatar', file.pre);
    //     e.target.value = null;
    // };

    // Validate when on change phone input
    const handleOnChangePhone = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            handleChange(e);
        }
    };

    // Handle reset values
    // const handleReset = () => {
    //     setValues({
    //         avatar: tourRef.current?.avatar,
    //         fullName: tourRef.current?.fullName,
    //         gender: tourRef.current?.gender,
    //         dob: tourRef.current?.dob,
    //         address: tourRef.current?.address,
    //         email: tourRef.current?.email,
    //         phone: tourRef.current?.phone,
    //         role: tourRef.current?.role,
    //     });
    // };
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
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            ID tour
                        </label>
                        <input type="text" value={values?.id} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Tên tour
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={tour?.name}
                            className={cx('detail-value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.name && touched.name ? errors.name : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Địa điểm
                        </label>
                        <input
                            type="text"
                            name="place"
                            value={tour?.place}
                            className={cx('detail-value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.place && touched.place ? errors.place : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Đơn giá
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={tour?.price}
                            className={cx('detail-value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.price && touched.price ? errors.price : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày bắt đầu
                        </label>
                        <input
                            type="text"
                            name="timeStart"
                            className={cx('detail-value')}
                            value={values.timeStart?.toLocaleDateString()}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.timeStart && touched.timeStart ? errors.timeStart : null}
                        </p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày kết thúc
                        </label>
                        <input
                            type="text"
                            name="timeEnd"
                            className={cx('detail-value')}
                            value={values.timeEnd?.toLocaleDateString()}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.timeEnd && touched.timeEnd ? errors.timeEnd : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giờ khởi hành
                        </label>
                        <input
                            type="text"
                            name="hourStart"
                            className={cx('detail-value')}
                            value={values.hourStart}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.hourStart && touched.hourStart ? errors.hourStart : null}
                        </p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Trạng thái
                        </label>
                        <select
                            name="status"
                            className={cx('detail-value')}
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="Activiting">Activiting</option>
                            <option value="Pending">Pending</option>
                            <option value="Ending">Ending</option>
                        </select>
                        <p className={cx('error-msg')}>{errors.status && touched.status ? errors.status : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Số lượng giới hạn
                        </label>
                        <input
                            type="text"
                            name="limit"
                            className={cx('detail-value')}
                            value={values.limit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.limit && touched.limit ? errors.limit : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Số khách hiện tại
                        </label>
                        <input
                            type="text"
                            name="currentCustomers"
                            className={cx('detail-value')}
                            value={values.currentCustomers}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>
                            {errors.currentCustomers && touched.currentCustomers ? errors.currentCustomers : null}
                        </p>
                    </div>
                    {/* <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Thể loại
                        </label>
                        <input type="text" name="categories" className={cx('detail-value')} value={values.categories}

                        />
                        <p className={cx('error-msg')}>{errors.limit && touched.limit ? errors.limit : null}</p>
                    </div> */}

                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Dịch vụ / tiện ích
                        </label>
                        <ul className={cx('utilities')}>
                            {values.utilities?.map((utility, i) => (
                                <li key={i} value={utility}>
                                    {utility}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giới thiệu
                        </label>
                        <textarea
                            id={cx('intro')}
                            name="intro"
                            className={cx('detail-value')}
                            value={values.intro}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <p className={cx('error-msg')}>{errors.intro && touched.intro ? errors.intro : null}</p>
                    </div>
                    {/* Wrap buttons */}
                    <div className={cx('wrap-btns')}>
                        <button type="button" id={cx('btn-reset')}>
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

export default memo(DetailTour);
