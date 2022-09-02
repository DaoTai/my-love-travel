import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import style from './styles.module.scss';
import { faCheck, faLocation, faLocationDot, faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons';
import InfoTour from './InfoTour';
import BookTour from './BookTour';
const cx = classNames.bind(style);
const data = {
    id: 1,
    name: 'Penth house Đà Lạt',
    place: 'Lâm Đồng',
    price: 1350000,
    start: new Date(),
    end: new Date(),
};
const DetailTour = () => {
    const { id } = useParams();

    return (
        <div className={cx('wrap-detail-tour')}>
            <img
                className={cx('tour-image')}
                src="https://cdn.luxstay.com/rooms/15111/large/1537264615_42044860_537358870032123_3138685967326511104_n.jpg"
                alt=""
            />
            <div className={cx('detail-tour')}>
                <div className={cx('content-tour')}>
                    {/* Info about tour */}
                    <InfoTour />

                    {/* Book tour */}
                    <BookTour />
                </div>
                <div className="comments-tour">Comment tour</div>
            </div>
        </div>
    );
};

export default DetailTour;
