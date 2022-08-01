import axios from 'commons/axios';
import { formatPrice } from 'commons/FormatPrice';
import React, {useState, useMemo} from 'react';

const CartItem=props=>{
    const [mount, setMount] =useState(props.cart.mount);
    const {id, name, image, price} = props.cart||{};

    const sumPrice = useMemo(()=> {
        return formatPrice(mount * parseInt(price))
    }, [mount, price]);

    const handleChange = e =>{
        //e.target.value实际上是字符串
        const _mount = parseInt(e.target.value);
        setMount(_mount);
        const newCart={
            ...props.cart,
            mount: _mount
        }
        axios.put(`/carts/${id}`,newCart).then(res=>{
            props.updateCart(newCart)
        });
    };

    const deleteCart = () =>{
        axios.delete(`http://localhost:3003/carts/${id}`).then(res=>{
            props.deleteCart(props.cart)
        })
    }

    return(
        <div className="columns is-vcentered">
            <div className="column is-narrow" onClick={deleteCart}>
                <span className="close">X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt={name} width="100"/>
            </div>
            <div className="column cart-name">
                {name}
            </div>
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            <div className="column">
                <input
                type="number"
                className="input num-input"
                //最小值应该为1
                min={1}
                value={mount}
                onChange={handleChange}
            />
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    );
};

export default CartItem; 