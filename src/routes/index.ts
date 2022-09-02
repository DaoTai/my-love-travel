import React from 'react';
import Home from '~/layouts/components/Home';
import Header from '~/layouts/components/Header';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/layouts/components/Tour/DetailTour';
import Login from '~/layouts/components/Auth/Login';
import Register from '~/layouts/components/Auth/Register';
import Fragment from '~/components/Fragment';
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
    },
    {
        path: 'tour',
        component: Fragment,
        children: [
            {
                path: 'detail-tour/:id',
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
