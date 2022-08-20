import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import img_1 from '~/assets/lich-su.jpg';
import img_2 from '~/assets/kham-pha.jpg';
import img_3 from '~/assets/nghi-duong.jpg';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);
const Categories = () => {
    return (
        <div id={cx('categories')}>
            <h1>Thể loại tour thịnh hành</h1>
            <h3>Việt Nam nằm trong những quốc gia có hệ sinh thái du lịch phong phú và đa dạng nhất trên thế giới</h3>
            <div className={cx('category')}>
                <h2 className={cx('category__heading')}>Di tích lịch sử</h2>
                <p className={cx('category__desc-content')}>
                    Nếu bạn là người yêu những giá trị văn hóa của nhiều vùng đất trong và ngoài nước, muốn được tham
                    quan các di tích lịch sử nổi tiếng thì đây chính là hình thức du lịch tuyệt vời.
                </p>
                <div className={cx('category__image')} style={{ backgroundImage: `url(${img_1})` }}>
                    <Link to="/">Xem ngay</Link>
                </div>
            </div>

            <div className={cx('category')}>
                <h2 className={cx('category__heading')}>Sinh thái khám phá</h2>
                <p className={cx('category__desc-content')}>
                    Khi cuộc sống hiện đại trở nên quá áp lực, ngột ngạt thì du lịch sinh thái giờ đây nổi lên như một
                    trào lưu mới. Phù hợp cho những du khách thích trải nghiệm, hòa mình vào thiên nhiên và sẵn sàng cho
                    những thử thách không ngờ tới.
                </p>
                <div className={cx('category__image')} style={{ backgroundImage: `url(${img_2})` }}>
                    <Link to="/">Xem ngay</Link>
                </div>
            </div>

            <div className={cx('category')}>
                <h2 className={cx('category__heading')}>Du lịch nghỉ dưỡng</h2>
                <p className={cx('category__desc-content')}>
                    Giúp du khách lấy lại tinh thần, sức khỏe thông qua các hình thức trị liệu, dịch vụ chăm sóc cao cấp
                    tại các resort đối tác của Love Travel,....
                </p>
                <div className={cx('category__image')} style={{ backgroundImage: `url(${img_3})` }}>
                    <Link to="/">Xem ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default Categories;
