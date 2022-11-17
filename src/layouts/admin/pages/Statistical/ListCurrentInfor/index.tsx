import className from 'classnames/bind';
import Item from './CurrentInfor';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const data = [
    {
        heading: 'Tỉ lệ huỷ tour ',
        progressPercent: 50,
        amount: 3,
        isMorePreviousMonth: false,
    },
    {
        heading: 'Tour trong tháng ',
        progressPercent: 50,
        amount: 500,
        isMorePreviousMonth: false,
    },

    {
        heading: 'Doanh thu',
        progressPercent: 100,
        amount: 35000000,
        isMorePreviousMonth: true,
    },

    {
        heading: 'Khách hàng',
        progressPercent: 79,
        amount: 144,
        isMorePreviousMonth: true,
    },
];

const ListCurrentInfor = () => {
    return (
        <div id={cx('list-current-infor')}>
            <div className={cx('content')}>
                {data.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ListCurrentInfor;
