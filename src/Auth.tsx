import React from "react";
import {useState, createContext, useContext, ReactNode, } from "react";
interface AuthContextProps{
    children:ReactNode;
}
interface AuthState {
    loggedIn : boolean;
    role:string|null;
    
}
interface AuthContextType {
    authState:AuthState;
    login: (user: AuthState) => void;
    logout: () => void;
  }

const AuthContext=createContext<null|AuthContextType>(null);

export const AuthProvider:React.FC<AuthContextProps>=({children})=>{
    const [authState,setAuthState]=useState<AuthState>({ loggedIn: false, role: null });
    const login=(user:AuthState)=>{
        setAuthState({ loggedIn: true, role: user.role });
        
    };
    const logout=()=>{
        setAuthState({ loggedIn: false, role: null });
    };
    const authContextValue: AuthContextType = {
        authState,
        login,
        logout,
      };
    
    return(
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;

    
};