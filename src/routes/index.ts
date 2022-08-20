import React from 'react';
import Home from '~/layouts/components/Home';
import ErrorPage from '~/layouts/components/ErrorPage';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/components/DetailTour';

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

export { publicRoutes };
