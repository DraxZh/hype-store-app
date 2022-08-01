import React from 'react';

const CartItem=()=>{
    return(
        <div className="columns">
            <div className="column">
                <span className="close">X</span>
            </div>
            <div className="column">
                <img src="images/1.jpg" alt="" width="100"/>
            </div>
            <div className="column cart-name">
                Nike Paul George PG 3
            </div>
            <div className="column">
                <span className="price">$538.00</span>
            </div>
        </div>
    )
}

export default CartItem;