import React from 'react';
import Header from '../Header';
import Intro from '../Intro';
import Categories from '../Categories';
import Event from '../Event';
import Suggestion from '../Suggestion';

const Home: React.FC = () => {
    return (
        <>
            <Intro />
            <Categories />
            <Event />
            <Suggestion />
        </>
    );
};

export default Home;
