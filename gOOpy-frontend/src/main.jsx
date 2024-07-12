import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import App from './App.jsx';

import Home from './pages/Home/Home.jsx';
import Editor from './pages/Editor/Editor.jsx';
import UserPage from './pages/User/UserPage.jsx';
import Login from './pages/User/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'editor',
                element: <Editor />,
            },
            {
                path: 'editor/:id',
                element: <Editor />,
            },
            {
                path: 'user/:id',
                element: <UserPage />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
