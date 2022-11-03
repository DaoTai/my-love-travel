import { Route } from './interface';
import Home from '~/layouts/components/Home';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/layouts/components/Tour/DetailTour';
import Fragment from '~/components/Fragment';
// import about Auth
import { Login, Register, ConfirmAccount, ConfirmOTP } from '~/layouts/components/Auth';
//import about User
import { Profile, PrivateTours, History, FavouriteTours, DetailPrivateTour } from '~/layouts/user/components';
// import about Admin
import { Admin, AccountCreator, Chart, ManageUsers, ManageTours } from '~/layouts/admin/components';
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
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'confirm-account',
        component: ConfirmAccount,
    },
    {
        path: 'confirm-OTP',
        component: ConfirmOTP,
    },
];

// User routes
const userRoutes: Array<Route> = [
    {
        path: 'profile',
        component: Profile,
    },
    {
        path: 'private-tours',
        component: PrivateTours,
        // children: [
        //     {
        //         path: 'detail-private-tour/:id',
        //         component: DetailPrivateTour,
        //     },
        // ],
    },
    {
        path: 'history',
        component: History,
    },
    {
        path: 'favourite-tours',
        component: FavouriteTours,
    },
];

// Admin routes
const adminRoutes: Array<Route> = [
    {
        path: '',
        component: Chart,
    },
    {
        path: 'chart',
        component: Chart,
    },
    {
        path: 'account-creator',
        component: AccountCreator,
    },
    {
        path: 'manage-tours',
        component: ManageTours,
    },
    {
        path: 'manage-users',
        component: ManageUsers,
    },
];

export { publicRoutes, authRoutes, userRoutes, adminRoutes };
