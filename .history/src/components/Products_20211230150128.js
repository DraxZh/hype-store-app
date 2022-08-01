import React from 'react';
import axios from 'axios';
import ToolBox from './ToolBox';
import Product from './Product';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Panel from 'components/Panel';
import AddInventory from 'components/AddInventory';

class Products extends React.Component{
    state = {
        products:[],
        //搜素后products的值会被更改
        sourceProducts:[]
    };

    componentDidMount(){
        axios.get('http://localhost:3003/products').then(response=>{
            this.setState({
                products:response.data,
                sourceProducts: response.data
            });
        });
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
                console.log(data);
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
                                        <Product product={p} update={this.update} delete={this.delete}/>
                                    </div>
                                    </CSSTransition>
                                );
                            })
                        }
                        </TransitionGroup>
                    </div>
                    <button className="button is-primary add-btn" onClick={this.toAdd}>ADD</button>
                </div>
            </div>
        )
    }
}

export default Products;