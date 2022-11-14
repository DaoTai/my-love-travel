import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { options } from './config';
import { getGender } from '../Redux-Saga/actions';
import { ChartGenderData } from '../interface';
import { genderUserSelector } from '../Redux-Saga/selectors';

const GenderUser = () => {
    const dispatch = useDispatch();
    const genderUserData = useSelector(genderUserSelector);
    useEffect(() => {
        dispatch(getGender());
    }, [dispatch]);
    const configOptions = options(genderUserData as ChartGenderData[]);
    return <div>{<HighchartsReact highcharts={Highcharts} options={configOptions} />}</div>;
};

export default GenderUser;
