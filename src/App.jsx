import React from 'react';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './auth/Login';
import Singup from './auth/Singup'

const App = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
