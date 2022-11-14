import React from 'react';
import CategoryChart from './Category';
import GenderCustomer from './GenderCustomer';
import AmountOfCustomer from './AmountOfCustomer';
import GMV from './GMV';
const Chart = () => {
    return (
        <div>
            <CategoryChart />
            <GenderCustomer />
            <AmountOfCustomer />
            <GMV />
        </div>
    );
};

export default Chart;
