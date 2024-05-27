import { Navigate } from 'react-router-dom'
import App from '../App.tsx'
import Main from "../components/Main"
import Shop from '../components/Shop'
import Cart from '../components/Cart'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <h1>Page not found!</h1>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" />,
            },
            {
                path: 'home',
                element: <Main />
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'cart',
                element: <Cart />
            }
        ]
    }
];

export default routes;