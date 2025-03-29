import React from 'react';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './auth/Login';
import Singup from './auth/Singup'
import Device from './pages/Devices'
import ControlsDevices from './pages/ControlsDevices'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
const App = () => {
  return (
     <ThemeProvider>
    <Router>
      <Routes>
        <Route path='/'element={<Layout/>}>
             <Route index element={<><h1>Homepage</h1></>}/>
        </Route>
        <Route path='/login'element={<Layout/>}>
             <Route index element={<Login/>}/>
        </Route>
        <Route path='/signup'element={<Layout/>}>
             <Route index element={<Singup/>}/>
        </Route>
        <Route path='/home'element={<Layout/>}>
             <Route index element={<Home/>}/>
        </Route>
        <Route path='/device'element={<Layout/>}>
             <Route index element={<Device/>}/>
        </Route>
        <Route path='/controls'element={<Layout/>}>
             <Route index element={<ControlsDevices/>}/>
        </Route>
        <Route path='/analytics'element={<Layout/>}>
             <Route index element={<Analytics/>}/>
        </Route>
        <Route path='/settings'element={<Layout/>}>
             <Route index element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
   </ThemeProvider>
  );
};

export default App;
