import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface CurrentInforProps {
    heading: string;
    progressPercent?: number;
    colorIcon?: string;
    icon?: IconProp;
    amount: number;
    isMorePreviousMonth?: boolean;
}
