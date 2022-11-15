import React from 'react';
import BookedCategories from './BookedCategories';
import GenderCustomer from './GenderCustomer';
import AmountOfCustomer from './AmountOfCustomer';
import GMV from './GMV';
const Chart = () => {
    return (
        <div>
            <BookedCategories />
            <GenderCustomer />
            <AmountOfCustomer />
            <GMV />
        </div>
    );
};

export default Chart;
