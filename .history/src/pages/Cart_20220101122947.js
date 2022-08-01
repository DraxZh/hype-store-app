import React from 'react';
import ToolBox from '../components/ToolBox';
import Header from 'components/Header';
import { render } from 'react-dom';
import {Layout} from 'Layout';

function cartSample(){
    render(
    <Layout>
            <div className="main">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    <p>Cart Product</p>
                    <p>Cart Product</p>
                    <p>Cart Product</p>
                </div>
                <div className="cart-total">
                    Total:
                    <span className="total-price">$123</span>
                </div>
            </div>
    </Layout> 
    
    );
}

const Cart = cartSample;
export default Cart;