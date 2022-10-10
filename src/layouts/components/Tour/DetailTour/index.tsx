import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
import InfoTour from './InfoTour';
import BookTour from './BookTour';
import CommentsTour from './CommentsTour';
import { Tour } from '../interface';
const cx = classNames.bind(style);
const data: Tour = {
    id: 1,
    name: 'Penth house Đà Lạt',
    place: 'Lâm Đồng',
    price: 1350000,
    images: [
        'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/07/16/16/08/island-3542290_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/10/02/16/12/nature-3719233_1280.jpg',
    ],
    timeStart: new Date(),
    timeEnd: new Date(),
    status: 'Activing',
    limit: 50,
    currentCustomers: 40,
    categories: ['Sinh thái khám phá'],
    utilities: ['Khăn mát', '1 người / 1 chai nước Lavie', 'Bản đồ du lịch'],
    intro: 'Nhu cầu của những cá nhân, gia đình đã làm việc vất vả trong thời gian dài, muốn lựa chọn các kiểu du lịch nghỉ dưỡng để thư giãn cơ thể, đầu óc, vậy một chuyến du lịch tại Suối Tiên Bình Thuận sẽ không thể làm thất vọng được mọi người dân!',
};
const DetailTour = () => {
    const { id } = useParams();

    return (
        <div className={cx('wrap-detail-tour')}>
            <img className={cx('tour-image')} srcSet={data.images ? data.images[1] : ''} alt="" />
            <div className={cx('detail-tour')}>
                <div className={cx('content-tour')}>
                    {/* Info about tour */}
                    <InfoTour tour={data} />

                    {/* Book tour */}
                    <BookTour tour={data} />
                </div>
                {/* Comments about tour */}
                <CommentsTour />
            </div>
        </div>
    );
};

export default DetailTour;
