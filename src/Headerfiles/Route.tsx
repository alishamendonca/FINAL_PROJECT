import LazyLoader from "../LazyLoader";

import { lazy } from "react";
//import EditEvent from "./EditEvent";

const Calendar =LazyLoader(lazy(async () => await import('./MyCalendar')));
const CreateEvent=LazyLoader(lazy(async () => await import('./Createevent')));
const Dashboard=LazyLoader(lazy(async () => await import('./Dashboard')));
const Viewevent=LazyLoader(lazy(async () => await import('./ViewEvent')));
//const Roles=LazyLoader(lazy(async () => await import('./Roles')));
//const ScheduleMeet=LazyLoader(lazy(async () => await import('./ScheduleMeet')));
//const Settings=LazyLoader(lazy(async () => await import('./Settings')));
const Editevent=LazyLoader(lazy(async () => await import('./EditEvent')));
const Registration=LazyLoader(lazy(async () => await import('../Registration/Registration')));
const SignIn=LazyLoader(lazy(async () => await import('../Registration/SignIn')));





const Routes=[
    {
        path:'/calendar/',
        element:<Calendar />,
    },
    {
        path:'create-event',
        element:<CreateEvent />,
    },
    {
        path:'/',
        element:<Dashboard />,
    },
    {
        path:'/registration/',
        element:<Registration />,
    },
    {
        path:'/signin/',
        element:<SignIn />,
    },
    
    // {
    //     path:'/calendar/',
    //     element:<Participants />
    // },
    // {
    //     path:'/roles/',
    //     element:<Roles />
    // },
    // {
    //     path:'/participant-list/',
    //     element:<ScheduleMeet />
    // },
    {
        path:'/view-event/',
        element:<Viewevent />
    },
    {
        path:'/edit-event/',
        element:<Editevent />
    },
    // {
    //     path:'/settings/',
    //     element:<Settings />
    // }
    
]
export default Routes;

