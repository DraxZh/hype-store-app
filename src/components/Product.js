/* eslint-disable no-restricted-globals */
import React from 'react';
import Panel from 'components/Panel';
import {formatPrice} from 'commons/FormatPrice';
import EditInventory from './EditInventory';
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import withRouter from 'components/withRouter';

class Product extends React.Component{
    toEdit = () =>{
        Panel.open({
            component: EditInventory,
            props:{
                product: this.props.product,
                deleteProduct: this.props.delete,
            },
            /*if there is data being called back, then we can*/
            callback: data=>{
                if(data){
                    this.props.update(data);
                }
            }
        });
    };

    //添加到购物车步骤
    addCart = async() =>{
        if(!global.auth.isLogin()){
            this.props.history('/login')
            toast.info('Please Login First');
            return;
        }
        try{
            const user = global.auth.getUser() || {};
            const { id, name, image, price } = this.props.product;
            //获取某个id商品
            const res = axios.get(`/carts?productID=${id}`);
            const carts = res.data;
            if (carts && carts.length > 0) {
                const cart = carts[0];
                cart.mount += 1;
                axios.put(`/carts/${cart.id}`,cart);
            } else {
                const cart = {
                    productId: id,
                    name,
                    image,
                    price,
                    mount: 1, //该商品在购物车中默认的数量是多少
                    userId: user.email
                };              
                await axios.post('/carts', cart);
                toast.success('Add Cart Success');
                this.props.updateCartNum();
            }
        }catch(error){
            console.log(error.message)
            toast.error('Add Cart Failed');
        }
    }

    renderMangerBtn = () =>{
        const user = global.auth.getUser() || {};
        if(user.type === 1){
            return(
                <div className="p-head has-text-right" onClick={this.toEdit}>
                <span className="icon edit-btn">
                    <i className="fas fa-sliders-h"/>
                </span>
                </div>
            )
        }
    }
    render(){
        const {name, image, tags, price,status} = this.props.product;
        return(
            <div className={status ==='available'?'product':'product out-stock'}>
                {this.renderMangerBtn()}
                <div className="p-content">

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

export default withRouter(Product);