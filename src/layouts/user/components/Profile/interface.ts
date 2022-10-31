export interface Action {
    type: string;
    payload: Profile;
}

export interface Profile {
    id: number;
    avatar: string;
    fullName: string;
    gender: string;
    dob: string;
    address: string;
    email: string;
    phone: string;
}

export interface Avatar {
    pre?: string;
}
