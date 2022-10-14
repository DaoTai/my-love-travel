import React from 'react';
import Intro from '../Intro';
import Categories from '../Categories';
import Event from '../Event';
import Footer from '../Footer';
import Suggestion from '../Suggestion';
const Home: React.FC = () => {
    return (
        <>
            <Intro />
            <Categories />
            <Suggestion />
            <Event />
            <Footer />
        </>
    );
};

export default Home;
