import React from 'react';
import ToolBox from '../components/ToolBox';
import Header from 'components/Header';
import { render } from 'react-dom';

function cartSample(){
    render( 
    <div className="main">
        <p className="title has-text-centered">Cart Page</p>
    </div>)
}

const Cart = cartSample;
export default Cart;