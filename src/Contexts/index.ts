import { createContext } from 'react';
import { AuthContext as AuthContextInterface } from './interface';

const init = {
    auth: null,
    setAuth: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(init);
