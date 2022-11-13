import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { options } from './config';
import { getGender } from './actions';
import { genderUserSelector } from './selectors';

const GenderUser = () => {
    const dispatch = useDispatch();
    const genderUser = useSelector(genderUserSelector);
    useEffect(() => {
        dispatch(getGender());
    }, [dispatch]);
    const newOptions = options(genderUser);
    return <div>{<HighchartsReact highcharts={Highcharts} options={newOptions} />}</div>;
};

export default GenderUser;
