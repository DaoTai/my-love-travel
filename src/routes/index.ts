import { Route } from './interface';
import Home from '~/layouts/components/Home';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/layouts/components/Tour/DetailTour';
import Fragment from '~/components/Fragment';
// import about Auth
import { Login, Register } from '~/layouts/components/Auth';
//import about User
import { Profile, PrivateTours, Coin, FavouriteTours } from '~/layouts/user/components';

// Public routes
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

// Auth routes
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

// User routes
const userRoutes: Array<Route> = [
    {
        path: 'user/profile',
        component: Profile,
    },
    {
        path: 'user/private-tours',
        component: PrivateTours,
    },
    {
        path: 'user/coin',
        component: Coin,
    },
    {
        path: 'user/favourite-tours',
        component: FavouriteTours,
    },
];

export { publicRoutes, authRoutes, userRoutes };
