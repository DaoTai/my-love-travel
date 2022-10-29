import { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import Tour from '~/layouts/components/Tour';
import { Tour as ITour } from '~/layouts/components/Tour/interface';
import { tours } from '~/data';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);
const FavouriteTours = () => {
    // Get id favourite tours from local
    const [favIdTours, setFavIdTours] = useState(() => {
        const parseLocal = JSON.parse(`${localStorage.getItem('favTours')}`);
        return parseLocal ?? [];
    });
    // Get list favourite tours
    const favTours = useMemo(() => {
        const favTours = favIdTours.reduce((acc: [], id: number) => {
            const favTour = tours[0].filter((tour) => {
                return tour.id === id;
            });
            return [...acc, ...favTour];
        }, []);
        return favTours;
    }, [favIdTours]);
    // Handle add favourite tours
    const handleAddFavTour = useCallback((idFavTour: number) => {
        setFavIdTours((prev: number[]) => {
            const isExistFavTour = prev.includes(idFavTour);
            let newFavTours;
            isExistFavTour
                ? (newFavTours = prev.filter((id: number) => id !== idFavTour))
                : (newFavTours = [...prev, idFavTour]);
            localStorage.setItem('favTours', JSON.stringify(newFavTours));
            return newFavTours;
        });
    }, []);

    return (
        <div className="main">
            <div className={cx('wrap-list-fav-tour')}>
                {favTours.map((favTour: ITour) => {
                    return (
                        <Tour key={favTour.id} tour={favTour} favIdTours={favIdTours} onAddFavTour={handleAddFavTour} />
                    );
                })}
            </div>
        </div>
    );
};

export default FavouriteTours;
