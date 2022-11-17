import { PrivateTour } from '../interface';

export interface DetailPrivateTourProps {
    tour: PrivateTour | undefined;
    onHide: () => void;
}
