import React from 'react';
import {toast} from 'react-toastify'
import axio from 'commons/axios';
import axios from 'commons/axios';

class EditInventory extends React.Component{
    state={
        id: '',
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
    }

    componentDidMount(){
        const {id,name, image,tags ,price, status} = this.props.product;
        this.setState({
            id,
            name,
            image,
            tags,
            price,
            status
        })
    }

    handleChange = e =>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    submit=event=>{
        event.preventDefault();
        const product={...this.state};
        axios.put(`http://localhost:3003/products/${this.state.id}`, product).then(res=>{
            this.props.close(res.data);
            toast.success('Edit Success');
        })
    }

    onDelet=()=>{
        axios.delete(`http://localhost:3003/products/${this.state.id}`, product).then(res => {
            this.props.close(res.data);
            toast.info('Edit Success');
        })
    }
    render(){
        return(
            <div className="inventory">
                <p className="title has-text-centered">Add Product</p>
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange} placeholder="e.g. Nike Air Max 97" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Price</label>
                            <input type="text" className="input" name="price" value={this.state.price} onChange={this.handleChange} placeholder="e.g. 140" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange} placeholder="e.g. 5 colors" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" value={this.state.status} onChange={this.handleChange}>
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-danger" type= "button">Delete</button>
                        </div>
                        <div className="control">
                            <button className="button" type="button" onClick={()=>{this.props.close()}}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditInventory;