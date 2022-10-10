export interface Auth {
    id: string;
    username: string;
    role: string;
}

export interface AuthContext {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}
