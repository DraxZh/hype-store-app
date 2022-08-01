import axios from 'commons/axios';
import { formatPrice } from 'commons/FormatPrice';
import React, {useState} from 'react';

const CartItem=props=>{
    const [mount, setMount] =useState(props.cart.mount);
    const {id, name, image, price, mount} = props.cart||{};
    const sumPrice = formatPrice(mount * parseInt(price));

    const handleChange = e =>{
        const _mount = parseInt(e.target.value);
        setMount(_mount);
        const newCart={
            ...props.cart,
            mount: _mount
        }
        axios.put(`/carts/${id}`);
    };
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
                <input type="number" className="input num-input" valuealue={mount} onChange={handleChange}/>
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    );
};

export default CartItem; 