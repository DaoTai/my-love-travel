export interface Route {
    path: string;
    component: React.FC;
    children?: [
        {
            path: string;
            component: React.FC;
        },
    ];
}
