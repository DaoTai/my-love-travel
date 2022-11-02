import { useMemo, useState, useCallback, memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Toast, { Status } from '~/components/Toast';
import { Tour } from '../../interface';
import style from './styles.module.scss';
const cx = classNames.bind(style);

const BookTour = ({ tour }: { tour: Tour }) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);

    // Total price
    const totalPrice = useMemo(() => {
        return amount * tour.price;
    }, [amount]);

    // Hide toast
    const hideToast = useCallback(() => {
        setShowToast(false);
    }, []);

    // toastOptions
    const toastOptions = useMemo(() => {
        const endingTourMessage = tour.status === 'Ending' && 'Tour đã kết thúc';
        return {
            show: showToast,
            text:
                amount && tour.status === 'Activing' ? 'Đặt tour thành công' : endingTourMessage || 'Đặt tour thất bại',
            status: amount && tour.status === 'Activing' ? Status.success : Status.error,
            onHide: hideToast,
        };
    }, [showToast]);

    // Handle increase amount tour
    const handleIncreaseAmount = () => {
        setAmount((prev) => {
            return prev === tour.limit - tour.currentCustomers ? prev : prev + 1;
        });
    };

    // Handle decrease amount tour
    const handleDecreaseAmount = () => {
        setAmount((prev) => {
            return prev > 0 ? prev - 1 : prev;
        });
    };

    // Handle submit tour
    const handleSubmit = () => {
        console.log('Submit');

        setShowToast(true);
    };

    const timeStart =
        tour.timeStart.getDate() + '/' + (tour.timeStart.getMonth() + 1) + '/' + tour.timeStart.getFullYear();
    const timeEnd = tour.timeEnd.getDate() + '/' + (tour.timeEnd.getMonth() + 1) + '/' + tour.timeEnd.getFullYear();

    return (
        <>
            {/* Toast */}
            {showToast && <Toast {...toastOptions} />}
            {/* Book tour */}
            <div className={cx('book-tour')}>
                <p>
                    Đơn giá:
                    <span className={cx('tour-price')}>
                        {tour.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </span>
                </p>
                <p>
                    Giờ khởi hành: <span className={cx('tour-start')}>{tour.hourStart}</span>
                </p>
                <p>
                    Ngày khởi hành: <span className={cx('tour-start')}>{timeStart}</span>
                </p>
                <p>
                    Ngày kết thúc: <span className={cx('tour-end')}>{timeEnd}</span>
                </p>
                <p>
                    Tổng:
                    <span className={cx('total-price')}>
                        {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </span>
                </p>
                <div className={cx('wrap-amount-customer-input')}>
                    <button
                        className={cx('minus-btn', {
                            disabled: amount === 0,
                        })}
                        onClick={handleDecreaseAmount}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <button
                        className={cx('plus-btn', {
                            disabled: tour.limit - tour.currentCustomers <= amount,
                        })}
                        onClick={handleIncreaseAmount}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={tour.limit - tour.currentCustomers < amount}
                    className={cx('book-tour-btn', {
                        disabled:
                            tour.limit - tour.currentCustomers === 0 ||
                            tour.limit - tour.currentCustomers < amount ||
                            showToast,
                    })}
                >
                    Đặt tour
                </button>
            </div>
        </>
    );
};

export default memo(BookTour);
