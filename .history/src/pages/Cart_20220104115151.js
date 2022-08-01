import React from 'react';
import ToolBox from '../components/ToolBox';
import Layout from 'Layout';
import CartItem from 'components/CartItem';
import axios from 'commons/axios';

class Cart extends React.COmponent{
    state={
        carts:[]
    }

    componentDidMount(){
        axios.get('/carts').then(res=>this.setState({
            carts: res.data
        }))
    }

    render(){

    }
}

const Cart =()=>{
    return(
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shoppping Cart</span>
                <div className="cart-list">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
           
                <div className="cart-total">
                    Total:
                    <span className="total-price">$134</span>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;