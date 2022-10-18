import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { categories } from './config';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);
const Categories: React.FC = () => {
    return (
        <div id={cx('categories')}>
            <h1>Thể loại tour thịnh hành</h1>
            <h3>Việt Nam nằm trong những quốc gia có hệ sinh thái du lịch phong phú và đa dạng nhất trên thế giới</h3>
            {categories.map((category, i) => {
                return (
                    <div key={i} className={cx('category')}>
                        <h2 className={cx('category__heading')}>{category.name}</h2>
                        <p className={cx('category__desc-content')}>{category.description}</p>
                        <div className={cx('category__image')} style={{ backgroundImage: `url(${category.image})` }}>
                            <div className={cx('layer-children')}>
                                <Link to={category.link}>Xem ngay</Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;
