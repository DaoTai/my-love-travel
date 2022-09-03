import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import style from '../styles.module.scss';
const cx = classNames.bind(style);
const data = {
    id: 1,
    name: 'Penth house Đà Lạt',
    place: 'Lâm Đồng',
    price: 1350000,
    limit: 50,
    currentCustomers: 40,
    start: new Date(),
    end: new Date(),
};
const BookTour = () => {
    const [amount, setAmount] = useState<number>(0);
    const totalPrice = useMemo(() => {
        return amount * data.price;
    }, [amount]);

    const handleIncreaseAmount = () => {
        setAmount((prev) => {
            return prev === data.limit - data.currentCustomers ? prev : prev + 1;
        });
    };
    const handleDecreaseAmount = () => {
        setAmount((prev) => {
            return prev > 0 ? prev - 1 : prev;
        });
    };

    const handleSubmit = () => {
        console.log('Call API');
    };

    return (
        <div className={cx('book-tour')}>
            <p>
                Đơn giá:
                <span className={cx('tour-price')}>
                    {data.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
            </p>
            <p>
                Thời gian khởi hành: <span className={cx('tour-start')}>24/9/2022</span>
            </p>
            <p>
                Thời gian kết thúc: <span className={cx('tour-end')}>26/9/2022</span>
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
                        disabled: data.limit - data.currentCustomers <= amount,
                    })}
                    onClick={handleIncreaseAmount}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <button
                onClick={handleSubmit}
                disabled={data.limit - data.currentCustomers < amount}
                className={cx('book-tour-btn', {
                    disabled: data.limit - data.currentCustomers < amount || data.limit - data.currentCustomers === 0,
                })}
            >
                Đặt tour
            </button>
        </div>
    );
};

export default BookTour;
