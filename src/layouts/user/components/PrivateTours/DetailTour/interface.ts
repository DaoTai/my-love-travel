import { Tour } from '~/layouts/components/Tour/interface';

export interface DetailPrivateTourProps {
    tour: Tour | undefined;
    onHide: () => void;
}
