/* eslint-disable no-restricted-globals */
import React from 'react';
import Panel from 'components/Panel';
import {formatPrice} from 'commons/FormatPrice';
import EditInventory from './EditInventory';
import axios from 'commons/axios';

class Product extends React.Component{
    toEdit = () =>{
        Panel.open({
            component: EditInventory,
            props:{
                product: this.props.product,
                deleteProduct:this.props.delete,
            },
            /*if there is data being called back, then we can*/
            callback: data=>{
                if(data){
                    this.props.update(data);
                }
            }
        });
    };

    addCart = () =>{
        const { name, image,price } = this.props.product;
        const cart = {
            productId: id,
            name,
            image,
            price,
            mount: 1
        }
        axios.post('http://localhost:3000/carts');
    }

    render(){
        const {name, image, tags, price,status} = this.props.product;
        return(
            <div className={status ==='available'?'product':'product out-stock'}>
                <div className="p-content">
                    <div className="p-head has-text-right">
                        <i className="fas fa-sliders-h" onClick={this.toEdit}/>
                    </div>
                    <div className="img-wrapper">
                        <div className="out-stock-text">Out of Stock</div>
                        <figure className="image is-4by3">
                            <img src={image} alt={name} />
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="p-name">{name}</p>
                    
                </div>
                <div className="p-footer">
                    <p className="price">
                        {formatPrice(price)}
                    </p>
                    <button className="add-cart" disabled={status==='unavailable'} onClick={this.addCart}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Product;