import React from 'react';
import Intro from '../Intro';
import Categories from '../Categories';
import Event from '../Event';
import Footer from '../Footer';
import Suggestion from '../Suggestion';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { Helmet } from 'react-helmet';
const cx = classNames.bind(styles);
const Home: React.FC = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <Helmet>
                <title>Love Travel</title>
            </Helmet>
            <Intro />
            <Categories />
            <Suggestion />
            <Event />
            <Footer /> {/* Button scroll top */}
            <button
                id={cx('scroll-top-btn')}
                className="d-flex align-items-center justify-content-center"
                onClick={handleScrollTop}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </>
    );
};

export default Home;
