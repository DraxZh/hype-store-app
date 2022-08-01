import React from 'react';
import axios from 'commons/axios';
import ToolBox from './ToolBox';
import Product from './Product';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Panel from 'components/Panel';
import AddInventory from 'components/AddInventory';

class Products extends React.Component{
    state = {
        products:[],
        //搜素后products的值会被更改
        sourceProducts:[],
        cartNum: 0,
    };

    componentDidMount(){
        axios.get('/products').then(response=>{
            this.setState({
                products:response.data,
                sourceProducts: response.data,

            });
        });
        this.updateCartNum();
    }
    //search the products
    search = text =>{
        //Get New Array
        let _products = [...this.state.sourceProducts]
        //Filter New Array
        _products = _products.filter(p=>{
            //拿到name调用match方法
            const matchArray =  p.name.match(new RegExp(text, 'gi'));
            return !!matchArray;
        })
        //set state
        this.setState({
            products: _products
        })
    }
    
    toAdd=()=>{
        Panel.open({
            component: AddInventory,
            callback: data =>{
                if(data){
                    this.add(data);
                }
            }
        });
    }

    add = product =>{
        const _products = [...this.state.products];
        _products.push(product);
        const _sProducts = [...this.state.sourceProducts];
        _sProducts.push(product)

        this.setState({
            products:_products,
            sourceProducts:_sProducts
        })
    }

    update = product =>{
        const _products = [...this.state.products];
        const index = _products.findIndex(p=>p.id === product.id);
        _products.splice(index, 1, product);
        const _sProducts = [...this.state.sourceProducts];
        const sourceIndex = _sProducts.findIndex(p => p.id === product.id);
        _sProducts.splice(sourceIndex, 1, product);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        })
    }

    delete = id =>{
        const _products = this.state.products.filter(p=>p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id)
        this.setState({
            products:_products,
            sourceProducts : _sProducts
        });
    }

    updateCartNum = async () => {
        const cartNum = await this.initTotalCartNum();
        this.setState({
            cartNum: cartNum
        });
    }

    //return total number from the cart
    initTotalCartNum = async () => {
        const user = global.auth.getUser() || {};
        //把userid给传过去
        const res = await axios.get('/carts',
            {
                params: {
                    userId: user.email
                }
            }
        );
        //if there is no data in the response database, then we give an empty array.
        const carts = res.data || [];
        //carts.map(cart =>cart.mount):get an array of the data from mount, for example [2,1,2]
        //reduce((a, value)): add up the number in the array, 0 is initialized value
        const cartNum = carts.map(cart => cart.mount).reduce((a, value) => a + value, 0);
        return cartNum;
    };

    renderAddBtn = () =>{
        const user = global.auth.getUser() || {};
        if(user.type === 1){
            return(
                <button className="button is-primary add-btn" onClick={this.toAdd}>ADD</button>
            )
        }
    }

    render(){
        return(
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum}/>
                <div className="products">
                    <div className="columns is-multiline is-dektop">
                        <TransitionGroup component = {null}>
                        {
                            this.state.products.map(p=>{
                                return(
                                    <CSSTransition classNames="product-fade" timeout ={300} key={p.id}>
                                    <div className="column is-3" key={p.id}>
                                        <Product product={p} update={this.update} delete={this.delete} updateCartNum={this.updateCartNum}/>
                                    </div>
                                    </CSSTransition>
                                );
                            })
                        }
                        </TransitionGroup>
                    </div>
                    {this.renderAddBtn()}
                </div>
            </div>
        )
    }
}

export default Products;