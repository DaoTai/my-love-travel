import { Tour } from '~/layouts/components/Tour/interface';

export const data: Tour[] = [
    {
        id: 1,
        name: 'Penth house Đà Lạt',
        place: 'Lâm Đồng',
        price: 1350000,
        timeStart: new Date(),
        timeEnd: new Date(),
        images: [
            'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg',
            'https://cdn.pixabay.com/photo/2018/07/16/16/08/island-3542290_1280.jpg',
            'https://cdn.pixabay.com/photo/2018/10/02/16/12/nature-3719233_1280.jpg',
        ],
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
    {
        id: 2,
        name: 'Phố cổ Hà Nội',
        place: 'Ba Đình - Hoàn Kiếm',
        price: 380000,
        timeStart: new Date(),
        timeEnd: new Date(2022, 11, 24),
        status: 'Ending',
    },
    {
        id: 3,
        name: 'Chùa Tam Chúc',
        place: 'Hà Nam',
        price: 580000,
        timeStart: new Date(),
        timeEnd: new Date(),
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
    {
        id: 4,
        name: 'Thung Nai',
        place: 'Hoà Bình',
        price: 280000,
        timeStart: new Date(),
        timeEnd: new Date(),
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
    {
        id: 5,
        name: 'Penth house Đà Lạt',
        place: 'Lâm Đồng',
        price: 1350000,
        timeStart: new Date(),
        timeEnd: new Date(),
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
    {
        id: 6,
        name: 'Phố cổ Hà Nội',
        place: 'Ba Đình - Hoàn Kiếm',
        price: 380000,
        timeStart: new Date(),
        timeEnd: new Date(2022, 11, 24),
        status: 'Ending',
    },
    {
        id: 7,
        name: 'Chùa Tam Chúc',
        place: 'Hà Nam',
        price: 580000,
        timeStart: new Date(),
        timeEnd: new Date(),
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
    {
        id: 8,
        name: 'Thung Nai',
        place: 'Hoà Bình',
        price: 280000,
        timeStart: new Date(),
        timeEnd: new Date(),
        status: 'Activing',
        limit: 50,
        currentCustomers: 40,
        categories: ['Sinh thái khám phá'],
    },
];
