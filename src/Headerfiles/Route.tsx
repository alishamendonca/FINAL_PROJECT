import LazyLoader from "../LazyLoader";
import PrivateRoute from "../PrivateRoute";
import { lazy } from "react";
//import EditEvent from "./EditEvent";

const Calendar =LazyLoader(lazy(async () => await import('./MyCalendar')));
const CreateEvent=LazyLoader(lazy(async () => await import('./Createevent')));
const Dashboard=LazyLoader(lazy(async () => await import('./Dashboard')));
const Viewevent=LazyLoader(lazy(async () => await import('./ViewEvent')));
const Editevent=LazyLoader(lazy(async () => await import('./EditEvent')));
const Registration=LazyLoader(lazy(async () => await import('../Registration/Registration')));
const SignIn=LazyLoader(lazy(async () => await import('../Registration/SignIn')));





const Routes=[
    {
        path:'/calendar/',
        element:<PrivateRoute path="/calendar/"><Calendar /></PrivateRoute>,
    },
    {
        path:'/create-event/',
        element:<PrivateRoute path="/create-event/"><CreateEvent /></PrivateRoute>,
    },
    {
        path:'/homepage/',
        element:<PrivateRoute path="/homepage/"><Dashboard /></PrivateRoute>,
    },
    {
        path:'/registration/',
        element:<Registration />,
    },
    {
        path:'/',
        element:<SignIn />,
    },
    
   
    {
        path:'/view-event/',
        element:<PrivateRoute path="/view-event/"><Viewevent /></PrivateRoute>
    },
    {
        path:'/edit-event/',
        element:<PrivateRoute path="/edit-event/"><Editevent /></PrivateRoute>
    },

    
];
console.log("Routes-rendering");
export default Routes;

