import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import Questions from './pages/Questions';
import Progress from './pages/Progress';
import theme from './config/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/words',
        element: <Questions />,
    },
    {
        path: '/progress',
        element: <Progress />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
