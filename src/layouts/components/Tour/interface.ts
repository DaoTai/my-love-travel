export interface Tour {
    id: number;
    name: string;
    place: string;
    categories?: string;
    price: number;
    start: Date;
    end: Date;
}
