import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Editor from './pages/Editor/Editor.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/editor',
        element: <Editor />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
                <h1 className='text-3xl font-bold'>gOOpy</h1>
                <h3>Login</h3>
            </header>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
