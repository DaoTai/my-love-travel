import { Category } from './interface';
import img_1 from '~/assets/lich-su.jpg';
import img_2 from '~/assets/kham-pha.jpg';
import img_3 from '~/assets/nghi-duong.jpg';
export const categories: Category[] = [
    {
        name: 'Di tích lịch sử',
        description:
            'Nếu bạn là người yêu những giá trị văn hóa của nhiều vùng đất trong và ngoài nước, muốn được tham quan các di tích lịch sử nổi tiếng thì đây chính là hình thức du lịch tuyệt vời.',
        image: img_1,
        link: '/',
    },
    {
        name: 'Sinh thái khám phá',
        description:
            ' Khi cuộc sống hiện đại trở nên quá áp lực, ngột ngạt thì du lịch sinh thái giờ đây nổi lên như một trào lưu mới. Phù hợp cho những du khách thích trải nghiệm, hòa mình vào thiên nhiên và sẵn sàng chonhững thử thách không ngờ tới.',
        image: img_2,
        link: '/',
    },
    {
        name: 'Du lịch nghỉ dưỡng',
        description:
            'Giúp du khách lấy lại tinh thần, sức khỏe thông qua các hình thức trị liệu, dịch vụ chăm sóc cao cấp tại các resort đối tác của Love Travel,....',
        image: img_3,
        link: '/',
    },
];
