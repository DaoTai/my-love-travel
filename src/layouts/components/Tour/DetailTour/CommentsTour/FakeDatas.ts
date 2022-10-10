import { Comment } from '../../interface';
export const myAccount = {
    id: 24,
    avatar: 'https://wallpaperaccess.com/full/1102530.jpg',
    nameAccount: 'A$AP Richy',
};
export const myComments: Partial<Comment>[] = [
    {
        id: 11,
        idTour: '1',
        comment: 'Good services !!',
        time: '2 ngày trước',
    },
];
export const comments: Comment[] = [
    {
        id: 123,
        idTour: '1',
        idAccount: 1,
        avatar: 'https://cdn-img.thethao247.vn/storage/files/tranvutung/2022/09/01/psg-gap-van-han-bo-ba-neymar-messi-mbappe-tan-vo-trong-vai-gio-toi-181040.jpeg',
        nameAccount: 'Đào Tài',
        comment: 'Tour tuyệt vời, rất thú vị !!',
        time: '2 phút trước',
    },
    {
        id: 212,
        idTour: '1',
        idAccount: 2,
        avatar: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/3/10/1022072/Travis-Scott-1.jpg',
        nameAccount: 'Louis ',
        comment: 'Great tour !!',
        time: '4 phút trước',
    },
    {
        id: 312,
        idTour: '1',
        idAccount: 3,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/250px-Drake_July_2016.jpg',
        nameAccount: 'Johnny',
        comment: 'Beautiful !!',
        time: '5 phút trước',
    },
    {
        id: 314,
        idTour: '1',
        idAccount: 4,
        avatar: 'https://vcdn-giaitri.vnecdn.net/2020/10/05/tran-thanh-7393-1601889627.jpg',
        nameAccount: 'Thành Cry',
        comment: 'Khóc thấy mẹ luôn !!',
        time: '6 phút trước',
    },
    {
        id: 99,
        idTour: '3',
        idAccount: 4,
        avatar: 'https://vcdn-giaitri.vnecdn.net/2020/10/05/tran-thanh-7393-1601889627.jpg',
        nameAccount: 'Thành Cry',
        comment: 'Ra gì đấy !!',
        time: '6 phút trước',
    },
];
