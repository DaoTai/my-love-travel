import { FC, ReactElement } from 'react';

// Interface data
export interface ToastData {
    status: any;
    title?: string;
    text: string;
    show: boolean;
    onHide?: () => void;
}
