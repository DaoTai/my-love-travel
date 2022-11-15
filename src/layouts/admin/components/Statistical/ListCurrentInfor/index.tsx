import className from 'classnames/bind';
import { faChevronCircleUp, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import Item from './CurrentInfor';
import { CurrentInforProps } from './CurrentInfor/interface';
import styles from './styles.module.scss';
const cx = className.bind(styles);

const data = [
    {
        heading: 'Tour trong tháng',
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
            <h3>Tháng hiện tại</h3>
            <div className={cx('content')}>
                {/* {data.map((item) => (
                    <Item {...item} />
                ))} */}
            </div>
        </div>
    );
};

export default ListCurrentInfor;
