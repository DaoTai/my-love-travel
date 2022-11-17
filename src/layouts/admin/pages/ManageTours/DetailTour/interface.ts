import { Tour } from '~/layouts/components/Tour/interface';

export interface DetailTourProps {
    tour: Tour | undefined;
    onHide: () => void;
}
