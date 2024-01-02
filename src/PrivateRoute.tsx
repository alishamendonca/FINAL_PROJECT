import React from 'react';
import {Navigate,Route,RouteProps} from 'react-router-dom';
import { useAuth } from './Auth';

interface PrivateRouteProps{
    path:string;
    children?:React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps>=({path,children})=>{
    console.log(`PrivateRoute - Rendering for path: ${path}`);
    const {authState}=useAuth();

    return authState.loggedIn?(
children
    ):(
        <Navigate to="/" replace={true} state={{from:path}}/>
    );
}

export default PrivateRoute;