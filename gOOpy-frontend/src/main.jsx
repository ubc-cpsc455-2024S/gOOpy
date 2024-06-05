import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Editor from './pages/Editor/Editor.jsx';

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
        <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
            <a className='text-3xl font-bold' href='/'>
                gOOpy
            </a>
            <a className='cursor-not-allowed'>Login</a>
        </header>
        <RouterProvider router={router} />
    </React.StrictMode>
);
