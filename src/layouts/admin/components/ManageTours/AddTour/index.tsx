import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose, faMinus, faPlus, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { init, detailTourOptions, statuses, categories, formInputs } from '../DetailTour/config';
import { addTour } from '../actions';
import Toast, { Status } from '~/components/Toast';
import { ToastData } from '~/components/Toast/interface';
import { manageUsersSelector } from '~/layouts/admin/components/ManageUsers/selector';
import { getUsers } from '~/layouts/admin/components/ManageUsers/actions';
import { STATUS } from '~/layouts/admin/components/ManageTours/constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { Tour } from '~/layouts/components/Tour/interface';
import Modal from '~/components/Modal';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const TourCreator = ({ isOpen, onHide }: { isOpen: boolean; onHide: () => void }) => {
    const dispatch = useDispatch();
    const listUser: AccountUser[] = useSelector(manageUsersSelector);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
    const [showSelectGuide, setShowSelectGuide] = useState<boolean>(false);
    const [selectedGuide, setSelectedGuide] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<STATUS>(STATUS.PENDING);
    const [utility, setUtility] = useState<string>('');
    const [utilities, setUtilities] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, handleReset } = useFormik({
        initialValues: init,
        validationSchema: detailTourOptions,
        onSubmit: (values, e: any) => {
            setShowToast(true);
            dispatch(addTour(values as Omit<Tour, 'id'>));
            handleReset(e);
        },
    });

    const toastOptions: ToastData = useMemo(() => {
        return {
            title: 'Thành công',
            show: showToast,
            status: Status.success,
            text: `Thêm tour thành công`,
            onHide: () => {
                setShowToast(false);
            },
        };
    }, [showToast]);

    const listGuide = useMemo(() => {
        return listUser.filter((user) => user.role === 'Người dẫn tour');
    }, [listUser]);

    // Dispatch action to get users
    useEffect(() => {
        // Dispatch get users to filter guides
        dispatch(getUsers());
        const handleKeyDown = (e: KeyboardEvent): void => {
            e.which === 27 && onHide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch, onHide]);

    // When change images
    useEffect(() => {
        setFieldValue('images', images);
        return () => {
            images.forEach((image) => {
                image && URL.revokeObjectURL(image);
            });
        };
    }, [images, setFieldValue]);

    // Set field utilities
    useEffect(() => {
        setFieldValue('utilities', utilities);
    }, [utilities, setFieldValue]);

    // Handle select guide
    const handleSelectGuide = (guide: AccountUser | null) => {
        if (guide) {
            setSelectedGuide(guide.fullName as string);
            setFieldValue('guide', guide?.fullName);
        } else {
            setSelectedGuide('Chưa xác định');
            setFieldValue('guide', '');
        }
        setShowSelectGuide(false);
    };

    // Handle select status
    const handleSelectStatus = (status: STATUS) => {
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
            {isOpen && (
                <Modal title="Thêm tour mới">
                    <div id={cx('tour-creator')}>
                        <button id={cx('close-btn')}>
                            <FontAwesomeIcon icon={faClose} onClick={onHide} />
                        </button>

                        <div>
                            <Tippy animation="fade" placement="left" content="Hoàn tác">
                                <button id={cx('reset-btn')} onClick={handleReset}>
                                    <FontAwesomeIcon icon={faUndo} />
                                </button>
                            </Tippy>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit} action="" className={cx('register-form')}>
                            {/* Normal Inputs */}
                            {formInputs.map((input, i) => {
                                const nameInput = input.name as keyof Tour;
                                return (
                                    <div key={i} className={cx('form-group')}>
                                        <label htmlFor={nameInput} className={cx('form-label')}>
                                            {input.label}
                                        </label>
                                        <input
                                            id={nameInput}
                                            type={input.type}
                                            name={nameInput}
                                            className={cx('form-input')}
                                            value={values[nameInput]}
                                            placeholder={input.placeholder}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className={cx('error-msg')}>
                                            {errors[nameInput] && touched[nameInput] ? errors[nameInput] : null}
                                        </p>
                                    </div>
                                );
                            })}
                            {/* ========================================= */}
                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
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
                                                        className={cx('item')}
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
                                <p className={cx('error-msg')}>
                                    {errors.status && touched.status ? errors.status : null}
                                </p>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
                                    Thể loại:
                                </label>
                                <div className={cx('categories')}>
                                    {categories.map((category, index) => (
                                        <p key={index} className={cx('category')}>
                                            <input
                                                id={`category-${index}`}
                                                type="checkbox"
                                                name="categories"
                                                className={cx('form-input')}
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

                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
                                    Dịch vụ / tiện ích:
                                </label>
                                <ul className={cx('utilities')}>
                                    {utilities?.map((utility, i) => (
                                        <li key={i} value={utility} className={cx('utility')}>
                                            {utility}
                                            <Tippy content="Xoá" placement="right" animation="fade">
                                                <span
                                                    className={cx('remove-icon')}
                                                    onClick={() => handleRemoveUtility(i)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </span>
                                            </Tippy>
                                        </li>
                                    ))}
                                    <li className={cx('utility')}>
                                        <input
                                            type="text"
                                            value={utility}
                                            placeholder="Thêm dịch vụ, tiện ích"
                                            onChange={(e) => setUtility(e.target.value)}
                                        />
                                        <button type="button" className={cx('add-icon')} onClick={handleAddUtility}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
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
                                                            className={cx('item')}
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
                                            <span>{selectedGuide ? selectedGuide : 'Chưa xác định'}</span>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </button>
                                    </HeadlessTippy>
                                </div>
                                <p className={cx('error-msg')}>{errors.guide && touched.guide ? errors.guide : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
                                    Giới thiệu:
                                </label>
                                <textarea
                                    id={cx('intro')}
                                    name="intro"
                                    className={cx('form-input')}
                                    value={values.intro}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></textarea>
                                <p className={cx('error-msg')}>{errors.intro && touched.intro ? errors.intro : null}</p>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="" className={cx('form-label')}>
                                    Ảnh:
                                </label>
                                <ul className={cx('list-img')}>
                                    {images.map((img, i) => (
                                        <li
                                            key={i}
                                            className={cx('img-tour')}
                                            style={{ backgroundImage: `url(${img})` }}
                                        >
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
                                <p className={cx('error-msg')}>
                                    {errors.images && touched.images ? errors.images : null}
                                </p>
                            </div>
                            {/* Wrap buttons */}
                            <div className={cx('wrap-btns')}>
                                <button type="submit" id={cx('submit-btn')}>
                                    Tạo mới
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Toast */}
                </Modal>
            )}
            {showToast && <Toast {...toastOptions} />}
        </>
    );
};

export default TourCreator;
