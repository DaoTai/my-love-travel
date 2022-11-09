import { Tour } from '~/layouts/components/Tour/interface';

export interface PrivateTour extends Tour {
    bookedTours: number;
}

export interface Action {
    type: string;
    payload: PrivateTour[] | number;
}
