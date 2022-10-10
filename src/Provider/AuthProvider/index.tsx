import React, { useState } from 'react';
import { AuthContext } from '~/Contexts';
import { Auth } from '~/Contexts/interface';
const AuthProvider = ({ children }: { children: any }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const value = { auth, setAuth };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
