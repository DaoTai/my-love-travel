import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { options } from './config';
import { getAmountCustomer } from '../redux-saga/actions';
import { ChartAmountOfCustomerData } from '../interface';
import { amountOfCustomerSelector } from '../redux-saga/selectors';
const AmountOfCustomer = () => {
    const dispatch = useDispatch();
    const genderUserData = useSelector(amountOfCustomerSelector);
    const configOptions = options(genderUserData as ChartAmountOfCustomerData[]);
    useEffect(() => {
        dispatch(getAmountCustomer());
    }, [dispatch]);
    return <div>{<HighchartsReact highcharts={Highcharts} options={configOptions} />}</div>;
};

export default AmountOfCustomer;
