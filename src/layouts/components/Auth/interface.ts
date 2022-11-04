// Interface value register
export interface User {
    idUser?: number;
    fullName: string;
    dob: string;
    address: string;
    gender: 'Nam' | 'Nữ';
    email: string;
    phone: string;
    avatar?: string;
}

export interface Account {
    idAccount?: number;
    username: string;
    password: string;
    role: string;
}

export type AccountUser = Partial<User> & Partial<Account>;

export interface Register extends User, Account {
    repassword: string;
}
