import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import { options } from './config';
import { getGmv } from '../redux-saga/actions';
import { gmvSelector } from '../redux-saga/selectors';
import 'tippy.js/dist/tippy.css';
import styles from '../styles.module.scss';
const cx = className.bind(styles);
const Gmv = () => {
    const dispatch = useDispatch();
    const gmvData = useSelector(gmvSelector);
    const [year, setYear] = useState(new Date().getFullYear());
    const [showSelectTypes, setShowSelectTypes] = useState<boolean>(false);
    const configOptions = options(gmvData);
    const years = useMemo((): number[] => {
        let listYear: number[] = [];
        for (let i = 2020; i <= year; i++) {
            listYear = [...listYear, i];
        }
        return listYear;
    }, []);
    useEffect(() => {
        dispatch(getGmv(year));
    }, [dispatch, year]);
    return (
        <div id={cx('gmv')}>
            <div className={cx('select-year')}>
                <HeadlessTippy
                    placement="bottom"
                    interactive
                    visible={showSelectTypes}
                    onClickOutside={() => setShowSelectTypes(false)}
                    render={(attrs) => (
                        <ul className={cx('list-year-select')} {...attrs}>
                            {years.map((year) => (
                                <li key={year} className={cx('year')} onClick={() => setYear(year)}>
                                    {year}
                                </li>
                            ))}
                        </ul>
                    )}
                >
                    <button onClick={() => setShowSelectTypes(!showSelectTypes)}>
                        <span>{year}</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </HeadlessTippy>
            </div>
            {gmvData.length > 0 ? (
                <HighchartsReact highcharts={Highcharts} options={configOptions} />
            ) : (
                <p className="text-center">Dữ liệu trống</p>
            )}
        </div>
    );
};

export default Gmv;
