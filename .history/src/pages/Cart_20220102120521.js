import React from 'react';
import ToolBox from '../components/ToolBox';
import Layout from 'Layout';
 
import { render } from 'react-dom';


const Cart =()=>{
    return(
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shoppping Cart</span>
                <div className="cart-list">
                    <p>Cart Product</p>
                    <p>Cart Product</p>
                    <p>Cart Product</p>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;