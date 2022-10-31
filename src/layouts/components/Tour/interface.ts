export interface Action {
    type: string;
    payload: Tour[];
}

export interface Tour {
    id: number;
    name: string;
    place: string;
    categories: string[];
    images: string[];
    price: number;
    timeStart: Date;
    timeEnd: Date;
    intro: string;
    utilities: string[];
    status: 'Activing' | 'Ending' | 'Pending';
    limit: number;
    currentCustomers: number;
}

export interface TourProps {
    tour: Tour;
    favIdTours: number[];
    onAddFavTour: (id: number) => void;
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
