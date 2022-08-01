import React,{useState, useEffect, useMemo} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import ToolBox from '../components/ToolBox';
import Layout from 'Layout';
import CartItem from 'components/CartItem';
import axios from 'commons/axios';
import { formatPrice } from 'commons/FormatPrice';
import cartItem from "components/CartItem";

const Cart =()=>{
    const [cartItems, setCartItems] = useState([]);
    //[]是第一个函数执行所以来得值，只有[]发生变化后，第一个函数才会执行

    useEffect(()=>{
        const user = global.auth.getUser() || {}
        axios.get("/carts?userID=${user.email}").then(res=>setCartItems(res.data))
    },[]);
    //reduce函数是为了累加总额
    const totalPrice = useMemo(() =>{
        const totalPrice=cartItems
            .map(cart =>cart.mount*parseInt(cart.price))
            .reduce((a, value)=>a+value, 0);
        return formatPrice(totalPrice);
    }, [cartItems]);

    const updateCart = cart =>{
        const newCarts = [...cartItems];
        const _index = newCarts.findIndex(c=>c.id===cart.id);
        newCarts.splice(_index, 1, cart);
        setCartItems(newCarts);
    }

    const deleteCart = cart =>{
        const newCarts = cartItems.filter(c => c.id !== cart.id)
        setCartItems(newCarts)
    }

    return(

        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    {/*null表示一开始不渲染任何元素*/}
                    <TransitionGroup component={null}>

                        {cartItems.map(cart=>(
                            <CSSTransition classNames = "cart-item" timeout={300} key={cart.id}>
                                <CartItem key={cart.id} cart={cart} updateCart={updateCart} deleteCart = {deleteCart}/>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                {
                    cartItems.length === 0 ? <p className="no-cart">No Item in your Cart</p> : ''
                }

                <div className="cart-total">
                    Total:
                    <span className="total-price">{totalPrice}</span>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;