import React from 'react';
import Intro from '../Intro';
import Categories from '../Categories';
import Event from '../Event';
import Footer from '../Footer';

const Home: React.FC = () => {
    return (
        <>
            <Intro />
            <Categories />
            <Event />
            <Footer />
        </>
    );
};

export default Home;
