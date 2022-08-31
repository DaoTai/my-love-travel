import React from 'react';
import Home from '~/layouts/components/Home';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/layouts/components/SearchTours/Search/DetailTour';
import Login from '~/layouts/components/Auth/Login';
import Register from '~/layouts/components/Auth/Register';
interface Route {
    path: string;
    component: React.FC;
    children?: [
        {
            path: string;
            component: React.FC;
        },
    ];
}

const publicRoutes: Array<Route> = [
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'search-tours',
        component: SearchTours,
        children: [
            {
                path: 'detail-tour',
                component: DetailTour,
            },
        ],
    },
];

const authRoutes: Array<Route> = [
    {
        path: 'auth/login',
        component: Login,
    },
    {
        path: 'auth/register',
        component: Register,
    },
];

export { publicRoutes, authRoutes };
