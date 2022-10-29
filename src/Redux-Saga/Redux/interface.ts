import { Tour } from '~/layouts/components/Tour/interface';

export interface Action {
    type: string;
    payload: Tour[];
}
