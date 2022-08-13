import React from 'react';
import Home from '~/Layout/components/Home';
import ErrorPage from '~/Layout/components/ErrorPage';
import SearchTours from '~/Layout/components/SearchTours';
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
