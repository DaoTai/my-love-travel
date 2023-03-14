import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Tour from '~/layouts/components/Tour';
import { Tour as ITour } from '~/layouts/components/Tour/interface';
import { getListTour } from '~/layouts/components/Tour/actions';
import { listTourSelector as storeListTour } from '~/layouts/components/Tour/selector';
import styles from './styles.module.scss';
import { Helmet } from 'react-helmet';
const cx = classNames.bind(styles);
const FavouriteTours = () => {
    const dispatch = useDispatch();
    const listTourSelector: Array<ITour[]> = useSelector(storeListTour);
    // Get id favourite tours from local
    const [favIdTours, setFavIdTours] = useState(() => {
        const parseLocal = JSON.parse(`${localStorage.getItem('favTours')}`);
        return parseLocal ?? [];
    });

    // Get list favourite tours
    const favTours = useMemo(() => {
        const flatTours = listTourSelector.reduce((acc: ITour[], tour: ITour[]) => [...acc, ...tour], []);
        const favTours = favIdTours.reduce((acc: [], id: number) => {
            const favTour = flatTours.filter((tour) => {
                return tour.id === id;
            });
            return [...acc, ...favTour];
        }, []);
        return favTours;
    }, [favIdTours, listTourSelector]);

    // Handle add favourite tours
    const handleAddFavTour = useCallback((idFavTour: number) => {
        setFavIdTours((prev: number[]) => {
            let newFavTours;
            const isExistFavTour = prev.includes(idFavTour);
            isExistFavTour
                ? (newFavTours = prev.filter((id: number) => id !== idFavTour))
                : (newFavTours = [...prev, idFavTour]);
            localStorage.setItem('favTours', JSON.stringify(newFavTours));
            return newFavTours;
        });
    }, []);

    useEffect(() => {
        dispatch(getListTour());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Tour yêu thích</title>
            </Helmet>
            <div className="main">
                <div className={cx('container')}>
                    <h1 className={cx('title')}>Tour yêu thích</h1>
                    <div className={cx('wrap-list-fav-tour')}>
                        {favTours.map((favTour: ITour) => {
                            return (
                                <Tour
                                    key={favTour.id}
                                    tour={favTour}
                                    favIdTours={favIdTours}
                                    onAddFavTour={handleAddFavTour}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavouriteTours;
