import { memo, useState, useEffect, useRef, useMemo, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faClose,
    faMinus,
    faPenToSquare,
    faPlus,
    faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { DetailTourProps } from './interface';
import { init, detailTourOptions, statuses, categories } from './config';
import { updateTour } from '../actions';
import { STATUS } from '../constants';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import Modal from '~/components/Modal';
import { manageUsersSelector } from '~/layouts/admin/components/ManageUsers/selector';
import { getUsers } from '~/layouts/admin/components/ManageUsers/actions';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { Tour } from '~/layouts/components/Tour/interface';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const DetailTour = ({ tour, onHide }: DetailTourProps) => {
    const dispatch = useDispatch();
    const listUser: AccountUser[] = useSelector(manageUsersSelector);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
    const [showSelectGuide, setShowSelectGuide] = useState<boolean>(false);
    const [utility, setUtility] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>(tour?.status as STATUS);
    const [selectedGuide, setSelectedGuide] = useState(tour?.guide);
    const [utilities, setUtilities] = useState<string[]>([...(tour?.utilities as string[])]);
    const [images, setImages] = useState<string[]>([...(tour?.images as [])]);
    const tourRef = useRef(Object(null));
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues: init,
        validationSchema: detailTourOptions,
        onSubmit: (values) => {
            setShowToast(true);
            dispatch(
                updateTour({
                    id: tour?.id,
                    ...values,
                } as Tour),
            );
        },
    });

    // Set values for form
    useEffect(() => {
        // Get users to filter guide
        dispatch(getUsers());
        // Assign to reset data tour
        tourRef.current = tour;
        // Set values
        setValues({
            id: tour?.id,
            name: tour?.name,
            guide: tour?.guide,
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
    }, [tour, dispatch, onHide, setValues]);

    // When change images
    useEffect(() => {
        setFieldValue('images', images);
        return () => {
            images.forEach((image) => {
                image && URL.revokeObjectURL(image);
            });
        };
    }, [images, dispatch, setFieldValue]);

    // Set field values
    useEffect(() => {
        setFieldValue('utilities', utilities);
    }, [utilities, dispatch, setFieldValue]);

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

    const listGuide = useMemo(() => {
        return listUser.filter((user) => user.role === 'Người dẫn tour');
    }, [listUser]);

    // Handle reset values
    const handleReset = () => {
        setValues({
            id: tourRef.current.id,
            name: tourRef.current.name,
            place: tourRef.current.place,
            price: tourRef.current.price,
            timeStart: tourRef.current.timeStart,
            hourStart: tourRef.current.hourStart,
            timeEnd: tourRef.current.timeEnd,
            images: tourRef.current.images,
            status: tourRef.current.status,
            limit: tourRef.current.limit,
            currentCustomers: tourRef.current.currentCustomers,
            categories: tourRef.current.categories,
            intro: tourRef.current.intro,
            utilities: tourRef.current.utilities,
        });
        setImages(tourRef.current.images);
        setSelectedGuide(tourRef.current.guide);
        setSelectedStatus(tourRef.current.status);
    };

    // Handle select guide
    const handleSelectGuide = (guide: AccountUser | null) => {
        if (guide) {
            setSelectedGuide(guide.fullName);
            setFieldValue('guide', guide.fullName);
        } else {
            setSelectedGuide('Chưa xác định');
            setFieldValue('guide', '');
        }
        setShowSelectGuide(false);
    };

    // Handle select type
    const handleSelectStatus = (status: string) => {
        setSelectedStatus(status);
        setShowSelectStatus(false);
        setFieldValue('status', status);
    };

    // Handle add utility
    const handleAddUtility = () => {
        utility && setUtilities((prev) => [...prev, utility]);
        setUtility('');
    };

    // Handle remove utility
    const handleRemoveUtility = (index: number) => {
        const newUtilities = [...utilities];
        newUtilities.splice(index, 1);
        setUtilities(newUtilities);
    };

    // Handle add new img
    const handlePreviewImg = (e: any) => {
        const files = e.target.files;
        Array.from(files).forEach((file: any) => {
            file.pre = URL.createObjectURL(file);
            setImages((prev) => [...prev, file.pre]);
        });
        e.target.value = null;
    };

    // Handle remove img
    const handleRemoveImg = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };
    return (
        <>
            {/* Detail user */}(
            <Modal title="Chi tiết tour">
                <button id={cx('close-btn')}>
                    <FontAwesomeIcon icon={faClose} onClick={onHide} />
                </button>
                {/* Form detail */}
                <form onSubmit={handleSubmit} action="" className={cx('wrap-detail-info')}>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            ID tour:
                        </label>
                        <input type="text" value={values?.id} readOnly className={cx('detail-value')} />
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Người dẫn tour:
                        </label>
                        <div className={cx('select-guide-tour')}>
                            <HeadlessTippy
                                placement="bottom"
                                interactive
                                visible={showSelectGuide}
                                onClickOutside={() => setShowSelectGuide(false)}
                                render={(attrs) => (
                                    <ul className={cx('list-guide-select')} {...attrs}>
                                        <li className={cx('item')} onClick={() => handleSelectGuide(null)}>
                                            Chưa xác định
                                        </li>
                                        {listGuide.map((guide) => {
                                            return (
                                                <li
                                                    key={guide.idUser}
                                                    className={cx('item', {
                                                        active: guide.fullName === tour?.guide,
                                                    })}
                                                    onClick={() => handleSelectGuide(guide)}
                                                >
                                                    <div className="d-flex justify-space-between">
                                                        <span>ID: {guide.idUser}</span>
                                                        <span>{guide.fullName}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            >
                                <button type="button" onClick={() => setShowSelectGuide(!showSelectGuide)}>
                                    <span>{selectedGuide}</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                            </HeadlessTippy>
                        </div>
                        <p className={cx('error-msg')}>{errors.guide && touched.guide ? errors.guide : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Tên tour:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            className={cx('detail-value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.name && touched.name ? errors.name : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Địa điểm:
                        </label>
                        <input
                            type="text"
                            name="place"
                            className={cx('detail-value')}
                            value={values.place}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className={cx('error-msg')}>{errors.place && touched.place ? errors.place : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Đơn giá:
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={values.price}
                            className={cx('detail-value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span>({values.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })})</span>
                        <p className={cx('error-msg')}>{errors.price && touched.price ? errors.price : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày bắt đầu:
                        </label>
                        <input
                            type="text"
                            name="timeStart"
                            className={cx('detail-value')}
                            value={values.timeStart as string}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span>(dd/mm/YYYY)</span>
                        <p className={cx('error-msg')}>
                            {errors.timeStart && touched.timeStart ? errors.timeStart : null}
                        </p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ngày kết thúc:
                        </label>
                        <input
                            type="text"
                            name="timeEnd"
                            className={cx('detail-value')}
                            value={values.timeEnd as string}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span>(dd/mm/YYYY)</span>
                        <p className={cx('error-msg')}>{errors.timeEnd && touched.timeEnd ? errors.timeEnd : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giờ khởi hành:
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
                            Trạng thái:
                        </label>
                        <div className={cx('select-status-tour')}>
                            <HeadlessTippy
                                placement="bottom"
                                interactive
                                visible={showSelectStatus}
                                onClickOutside={() => setShowSelectStatus(false)}
                                render={(attrs) => (
                                    <ul className={cx('list-status-select')} {...attrs}>
                                        {statuses.map((status, index) => (
                                            <li
                                                key={index}
                                                className={cx('item', {
                                                    active: status === tour?.status,
                                                })}
                                                onClick={() => handleSelectStatus(status)}
                                            >
                                                {status}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            >
                                <button type="button" onClick={() => setShowSelectStatus(!showSelectStatus)}>
                                    <span>{selectedStatus}</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                            </HeadlessTippy>
                        </div>
                        <p className={cx('error-msg')}>{errors.status && touched.status ? errors.status : null}</p>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Số lượng giới hạn:
                        </label>
                        <input
                            type="number"
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
                            Số khách hiện tại:
                        </label>
                        <input
                            type="number"
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
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Thể loại:
                        </label>
                        <div className={cx('categories')}>
                            {categories.map((category, index) => (
                                <p key={index} className={cx('category')}>
                                    <input
                                        id={`category-${index}`}
                                        type="checkbox"
                                        name="categories"
                                        className={cx('detail-value')}
                                        value={category}
                                        checked={values?.categories && values?.categories.includes(category)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </p>
                            ))}
                        </div>

                        <p className={cx('error-msg')}>
                            {errors.categories && touched.categories ? errors.categories : null}
                        </p>
                    </div>

                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Dịch vụ / tiện ích:
                        </label>
                        <ul className={cx('utilities')}>
                            {utilities.length > 0 ? (
                                utilities?.map((utility, i) => (
                                    <li key={i} value={utility} className={cx('utility')}>
                                        <b>{i + 1 + '.'}</b> {utility}
                                        <Tippy content="Xoá" placement="right" animation="fade">
                                            <span className={cx('remove-icon')} onClick={() => handleRemoveUtility(i)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </span>
                                        </Tippy>
                                    </li>
                                ))
                            ) : (
                                <p className={cx('error-msg')}>Chưa cập nhật</p>
                            )}
                            <div className={cx('utility')}>
                                <input
                                    type="text"
                                    value={utility}
                                    placeholder="Thêm dịch vụ, tiện ích"
                                    onChange={(e) => setUtility(e.target.value.trim())}
                                />
                                <button type="button" className={cx('add-icon')} onClick={handleAddUtility}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </ul>
                    </div>
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Giới thiệu:
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
                    <div className={cx('detail-item')}>
                        <label htmlFor="" className={cx('detail-label')}>
                            Ảnh:
                        </label>
                        <ul className={cx('list-img')}>
                            {images.map((img, i) => (
                                <li key={i} className={cx('img-tour')} style={{ backgroundImage: `url(${img})` }}>
                                    <button
                                        type="button"
                                        className={cx('remove-img')}
                                        onClick={() => handleRemoveImg(i)}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </li>
                            ))}
                            <label htmlFor="file-img" className={cx('img-tour')}>
                                <span className={cx('add-img')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                <input
                                    type="file"
                                    multiple
                                    name=""
                                    id="file-img"
                                    accept="image/png, image/gif, image/jpeg"
                                    hidden
                                    onChange={(e) => handlePreviewImg(e)}
                                />
                            </label>
                        </ul>
                        <p className={cx('error-msg')}>{errors.images && touched.images ? errors.images : null}</p>
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

export default memo(DetailTour);
