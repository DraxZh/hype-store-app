import React from 'react';

const CartItem=props=>{
    const {name, image, price, mount} = props.cart||{}
    return(
        <div className="columns is-vcentered">
            <div className="column is-narrow">
                <span className="close">X</span>
            </div>
            <div className="column is-narrow">
                <img src="images/1.jpg" alt="" width="100"/>
            </div>
            <div className="column cart-name">
                Nike Paul George PG 3
            </div>
            <div className="column">
                <span className="price">$138.00</span>
            </div>
            <div className="column">
                <input type="number" className="input number-input" />
            </div>
            <div className="column">
                <span className="sum-price">$138</span>
            </div>
        </div>
    )
}

export default CartItem; 