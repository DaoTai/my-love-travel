import React from 'react';
import classNames from 'classnames/bind';
import ModalLayout from '~/components/Modal';
import style from '../styles.module.scss';
import { Tour } from '../../../interface';
const cx = classNames.bind(style);
const DialogBooking = ({
    tour,
    totalPrice,
    onClose,
    onSubmit,
}: {
    tour: Tour;
    totalPrice: number;
    onClose: () => void;
    onSubmit: () => void;
}) => {
    return (
        <ModalLayout title="Đặt tour" size="small">
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
                Ngày khởi hành: <span className={cx('tour-start')}>{tour.timeStart}</span>
            </p>
            <p>
                Ngày kết thúc: <span className={cx('tour-end')}>{tour.timeEnd}</span>
            </p>
            <p>
                Tổng:
                <span className={cx('total-price')}>
                    {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
            </p>
            <p>
                Thanh toán:
                <img
                    src="https://www.paypalobjects.com/marketing/web/us/en/qr-code/QRC-landing.jpg"
                    alt="qr-code"
                    className={cx('qr-code-pay')}
                />
            </p>
            <div className={cx('wrap-btns')}>
                <button onClick={onClose}>Huỷ</button>
                <button id={cx('submit-btn')} onClick={onSubmit}>
                    Xác nhận
                </button>
            </div>
        </ModalLayout>
    );
};

export default DialogBooking;
