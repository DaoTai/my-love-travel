import slide1 from '~/assets/da-lat.jpg';
import slide2 from '~/assets/ha-noi.jpg';
import slide3 from '~/assets/phu-quoc.jpg';
import { Slide } from './interface';
export const settings = {
    dots: true,
    infinite: true,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: 'linear',
};

export const slides: Slide[] = [
    {
        image: slide1,
        quote: 'Chốn thiên đàng mộng mơ giữa trần gian',
        name: 'Đà Lạt',
        description:
            'Đà Lạt là thành phố trực thuộc tỉnh Lâm Đồng, nằm trên cao nguyên Lâm Viên, thuộc vùng Tây Nguyên, Việt Nam. Vùng đất thơ mộng luôn là điểm đến thú vị của các bạn trẻ.',
    },
    {
        image: slide2,
        quote: 'Hồ Gươm trăm năm cổ kính',
        name: 'Hà Nội',
        description:
            'Hà Nội là thủ đô của Việt Nam. Nơi đã lưu lại nhiều nốt thăng trầm của lịch sử và giữ gìn những di tích lịch sử cổ kính, trang nghiêm cùng những nét văn hoá đường phố thú vị.',
    },
    {
        image: slide3,
        quote: 'Hòn ngọc xanh của nhân loại',
        name: 'Phú Quốc',
        description:
            ' Phú Quốc là một hòn đảo nằm trong vịnh Thái Lan và là đảo lớn nhất Việt Nam, sở hữu vẻ đẹp hoang sơ, bãi biển xanh, rất thích hợp với những chuyến nghỉ dưỡng, vui chơi.',
    },
];
