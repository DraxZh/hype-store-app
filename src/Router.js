import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import { Fragment } from 'react';
import Cart from 'pages/Cart';


const Router = () =>(
    <Fragment>
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/register" element = {<Register/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route component={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </Fragment>
)
 
export default Router;