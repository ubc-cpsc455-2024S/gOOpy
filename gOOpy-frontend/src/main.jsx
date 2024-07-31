import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import { AuthProvider } from './components/AuthProvider.jsx';
import store from './redux/store/store.js';
import App from './App.jsx';

import Home from './pages/Home/Home.jsx';
import Editor from './pages/Editor/Editor.jsx';
import UserPage from './pages/User/UserPage.jsx';
import Login from './pages/User/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateUser from './pages/CreateUser/CreateUser.jsx';
import { Tutorial } from './pages/Tutorial/Tutorial.jsx';
import { UserList } from './pages/UserList/UserList.jsx';
import { LiveLogo } from './components/LiveLogo.jsx';

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
                path: 'editor/:sceneId',
                element: <Editor />,
            },
            {
                path: 'user/:id',
                element: <UserPage />,
            },
            {
                path: 'user',
                element: <UserList />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'createuser',
                element: <CreateUser />,
            },
            {
                path: 'tutorial',
                element: <Tutorial />,
            },
            {
                path: 'goopy',
                element: <LiveLogo />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
