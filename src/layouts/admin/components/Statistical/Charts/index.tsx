import React from 'react';
import CategoryChart from './Category';
import GenderCustomer from './GenderCustomer';
import AmountOfCustomer from './AmountOfCustomer';
const Chart = () => {
    return (
        <div>
            <CategoryChart />
            <GenderCustomer />
            <AmountOfCustomer />
        </div>
    );
};

export default Chart;
