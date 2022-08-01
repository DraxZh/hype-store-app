import React from 'react';
import withRouter from 'components/withRouter'
import {toast} from "react-toastify";


class ToolBox extends React.Component{

    state = {
        searchText:"",
    }
    //change the search bar into inputed value
    handleChange = event =>{
        const value = event.target.value;
        this.setState({
            searchText: value
        })
        this.props.search(value);
    };

    //clear search text
    clearSearchText = () =>{
        this.setState({
            searchText:''
        });
        this.props.search('')
    };

    goCart = () =>{
        if(!global.auth.isLogin()){
            this.props.history('/login')
            toast.info('Please Login First');

        }else{
            this.props.history('/cart');
        }
    }

    render(){
        return (
            <div className="tool-box">
                <div className="logo-text">Hype Store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                            type="text" 
                            className="input search-input" 
                            placeholder="Search Product"
                            value = {this.state.searchText}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="control">
                            <button className="button" onClick ={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <div to="/cart" className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ToolBox);
