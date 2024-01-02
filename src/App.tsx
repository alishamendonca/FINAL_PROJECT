//import Registration from './Registration/Registration';
//import SignIn from './Registration/SignIn';
import Routes from './Headerfiles/Route';
import Header from './Header'
import { useRoutes } from 'react-router-dom';

import './App.css';
//import { useState, } from 'react';
import Footer from './Footer';

function App() {
 

  const routing=useRoutes(Routes);
  return (
     <>
     <Header />
     {routing}
     <Footer />
     
    
    </>
  )
}

export default App
