import Fragment from '~/components/Fragment';
import Home from '~/layouts/components/Home';
import SearchTours from '~/layouts/components/SearchTours';
import DetailTour from '~/layouts/components/Tour/DetailTour';
import { Route } from './interface';
// import about Auth
import { ConfirmAccount, ConfirmOTP, Login, Register } from '~/layouts/components/Auth';
//import about User
import { FavouriteTours, History, PrivateTours, Profile, ProfileForm } from '~/layouts/user/pages';
// import about Admin
import { ManageTours, ManageUsers, Statistical } from '~/layouts/admin/components';
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
        component: Statistical,
    },
    {
        path: 'statistical',
        component: Statistical,
    },
    {
        path: 'profile',
        component: ProfileForm,
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
