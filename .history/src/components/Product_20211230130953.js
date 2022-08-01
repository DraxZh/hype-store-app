/* eslint-disable no-restricted-globals */
import React from 'react';
import Panel from 'components/Panel';
import {formatPrice} from 'commons/FormatPrice';
import EditInventory from './EditInventory';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

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

    addCart = async() =>{
        const { id, name, image,price } = this.props.product;
        //获取某个id商品
        const res = axios.get(`/carts?productID=${id}`);

        const carts = res.data;
        if(carts&&carts.length > 0){
            const cart = carts[0];
            cart.mount += 1;
            axios.put(`/carts/${cart.id}`, ) 
        }else{

        }

        const cart = {
            productId: id,
            name,
            image,
            price,
            mount: 1 //该商品在购物车中默认的数量是多少
        };

        await axios.post('http://localhost:3003/carts', cart).then(res =>{
           ;
        });
        toast.success('Add Cart Success');
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