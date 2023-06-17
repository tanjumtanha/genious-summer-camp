import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructor from "../Pages/Instructor/Instructor";
import AllClass from "../Pages/AllClass/AllClass";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import SelectedClass from "../Pages/Dashboard/SelectedClass/SelectedClass";
import EnrollClass from "../Pages/Dashboard/EnrollClass/EnrollClass";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import ManageClass from "../Pages/Dashboard/ManageClass/ManageClass";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/instructors',
                element: <Instructor></Instructor>
            },
            {
                path: '/classes',
                element: <AllClass></AllClass>
            },
        ],
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'mySelectedClasses',
                element:<SelectedClass></SelectedClass>
            },
            {
                path:'enrollClasses',
                element:<EnrollClass></EnrollClass>
            },
            {
                path:'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'manageUser',
                element:<AllUsers></AllUsers>
            },
            {
                path:'addClass',
                element:<InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path:'manageClasses',
                element:<AdminRoute><ManageClass></ManageClass></AdminRoute>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
]);