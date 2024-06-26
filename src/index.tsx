import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyles from '~/components/GlobalStyles';
import { AuthProvider } from '~/Provider';
import App from '~/App';
import { publicRoutes, authRoutes, userRoutes, adminRoutes } from '~/routes';
import { Home, ErrorPage } from '~/layouts/components';
import { Admin } from '~/layouts/admin/components';
import store from './Redux-Saga/Redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <AuthProvider>
            <GlobalStyles>
                <Router>
                    <Routes>
                        {/* Auth pages */}
                        <Route path="/auth">
                            {authRoutes?.map((route, i) => {
                                const Page = route.component;
                                return <Route key={i} path={route.path} element={<Page />} />;
                            })}
                        </Route>

                        {/* Public pages */}
                        <Route path="/" element={<App />}>
                            {publicRoutes?.map((route, i) => {
                                const Page = route.component;
                                const children = route.children;
                                return (
                                    <Route key={i} path={route.path} element={<Page />}>
                                        {children?.map((child, i) => {
                                            const ChildrenPage = child.component;
                                            return <Route key={i} path={child.path} element={<ChildrenPage />} />;
                                        })}
                                    </Route>
                                );
                            })}

                            {/* Default page */}
                            <Route index element={<Home />} />
                        </Route>

                        {/* User pages */}
                        <Route path="/user" element={<App />}>
                            {userRoutes?.map((route, i) => {
                                const Page = route.component;
                                const children = route.children;
                                return (
                                    <Route key={i} path={route.path} element={<Page />}>
                                        {children?.map((child, i) => {
                                            const ChildrenPage = child.component;
                                            return <Route key={i} path={child.path} element={<ChildrenPage />} />;
                                        })}
                                    </Route>
                                );
                            })}
                        </Route>

                        {/* Admin pages */}
                        <Route path="/admin" element={<Admin />}>
                            {adminRoutes.map((route, i) => {
                                const Page = route.component;
                                return <Route key={i} path={route.path} element={<Page />}></Route>;
                            })}
                        </Route>
                        {/* Error page */}
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </Router>
            </GlobalStyles>
        </AuthProvider>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
