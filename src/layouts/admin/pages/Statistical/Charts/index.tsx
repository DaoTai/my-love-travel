import className from 'classnames/bind';
import BookedCategories from './BookedCategories';
import GenderCustomer from './GenderCustomer';
import AmountOfCustomer from './AmountOfCustomer';
import GMV from './GMV';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const Chart = () => {
    return (
        <div>
            <div className={cx('wrap-chart')}>
                <div className={cx('chart-container')}>
                    <BookedCategories />
                </div>
                <div className={cx('chart-container')}>
                    <GenderCustomer />
                </div>
            </div>
            <div className={cx('wrap-chart')}>
                <div className={cx('chart-container')}>
                    <AmountOfCustomer />
                </div>
                <div className={cx('chart-container')}>
                    <GMV />
                </div>
            </div>
        </div>
    );
};

export default Chart;
