export interface Tour {
    id: number;
    name: string;
    place: string;
    categories?: string[];
    price: number;
    start: Date;
    end: Date;
    intro?: string;
    utilities?: string[];
    status: 'Activing' | 'Ending' | 'Pending';
    limit?: number;
    currentCustomers?: number;
}

export interface Comment {
    id: number;
    idTour: string;
    idAccount: number;
    avatar: string;
    nameAccount: string;
    comment: string;
    time: string;
}
