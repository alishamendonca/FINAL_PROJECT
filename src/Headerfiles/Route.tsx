import LazyLoader from "../LazyLoader";

import { lazy } from "react";

const Calendar =LazyLoader(lazy(async () => await import('./Calendar')));
const CreateEvent=LazyLoader(lazy(async () => await import('./Createevent')));
const Dashboard=LazyLoader(lazy(async () => await import('./Dashboard')));
//const Participants=LazyLoader(lazy(async () => await import('./Participants')));
//const Roles=LazyLoader(lazy(async () => await import('./Roles')));
//const ScheduleMeet=LazyLoader(lazy(async () => await import('./ScheduleMeet')));
//const Settings=LazyLoader(lazy(async () => await import('./Settings')));
const UserProfile=LazyLoader(lazy(async () => await import('./UserProfile')));
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
        path:'/dashboard/',
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
        path:'/user-profile/',
        element:<UserProfile />
    },
    // {
    //     path:'/settings/',
    //     element:<Settings />
    // }
    
]
export default Routes;

