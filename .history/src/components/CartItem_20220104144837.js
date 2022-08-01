import { formatPrice } from 'commons/FormatPrice';
import React from 'react';

const CartItem=props=>{
    const {name, image, price, mount} = props.cart||{};
    const sumPrice = formatPrice(mount * parseInt(price));
    return(
        <div className="columns is-vcentered">
            <div className="column is-narrow">
                <span className="close">X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt={name} width="100"/>
            </div>
            <div className="column cart-name">
                Nike Paul George PG 3
            </div>
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            <div className="column">
                <input type="number" className="input num-input" defaultValue={mount}/>
            </div>
            <div className="column">
                <span className="sum-price">sumPrice</span>
            </div>
        </div>
    );
};

export default CartItem; 