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
    start: new Date(),
    end: new Date(),
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
            <img
                className={cx('tour-image')}
                srcSet="https://cdn.luxstay.com/rooms/15111/large/1537264615_42044860_537358870032123_3138685967326511104_n.jpg"
                alt=""
            />
            <div className={cx('detail-tour')}>
                <div className={cx('content-tour')}>
                    {/* Info about tour */}
                    <InfoTour tour={data} />

                    {/* Book tour */}
                    <BookTour />
                </div>
                {/* Comments about tour */}
                <CommentsTour />
            </div>
        </div>
    );
};

export default DetailTour;
