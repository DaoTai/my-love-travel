import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GlobalStyles from '~/components/GlobalStyles';
import './index.css';
import App from '~/App';
import { publicRoutes } from '~/routes';
import { authRoutes } from '~/routes';
import Home from '~/layouts/components/Home';
import ErrorPage from '~/layouts/components/ErrorPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <Router>
                <Routes>
                    {/* Auth page */}
                    {authRoutes?.map((route, i) => {
                        const Page = route.component;
                        return <Route key={i} path={route.path} element={<Page />} />;
                    })}

                    {/* Public page */}
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

                    {/* Error page */}
                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
