import { Tour } from '~/layouts/components/Tour/interface';

export const data: Tour[] = [
    {
        id: 1,
        name: 'Penth house Đà Lạt',
        place: 'Lâm Đồng',
        price: 1350000,
        start: new Date(),
        end: new Date(),
    },
    {
        id: 2,
        name: 'Phố cổ Hà Nội',
        place: 'Ba Đình - Hoàn Kiếm',
        price: 380000,
        start: new Date(),
        end: new Date(2022, 11, 24),
    },
    {
        id: 3,
        name: 'Chùa Tam Chúc',
        place: 'Hà Nam',
        price: 580000,
        start: new Date(),
        end: new Date(),
    },
    {
        id: 4,
        name: 'Thung Nai',
        place: 'Hoà Bình',
        price: 280000,
        start: new Date(),
        end: new Date(),
    },
];
