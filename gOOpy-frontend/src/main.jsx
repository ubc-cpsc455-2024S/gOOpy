import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Editor from './pages/Editor/Editor.jsx';
import UserPage from './pages/User/UserPage.jsx';
import Login from './pages/User/Login.jsx';

import { Provider } from 'react-redux';
import store from './redux/store/store.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/editor',
        element: <Editor />,
    },
    {
        path: '/user',
        element: <UserPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
                <a className='text-3xl font-bold' href='/'>
                    gOOpy
                </a>
                <a href='/login'>Login</a>
            </header>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
