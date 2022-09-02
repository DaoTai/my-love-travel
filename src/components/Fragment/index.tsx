import React from 'react';
import { Outlet } from 'react-router-dom';

const Fragment = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Fragment;
