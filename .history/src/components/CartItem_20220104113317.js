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
        </div>
    )
}

export default CartItem;