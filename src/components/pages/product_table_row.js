import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class ProductRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.category_name}</td>
                <td>
                    <Link className='btn btn-info m-r-1em' to={'/ReadOneProductComponent/' + this.props.product.id} >Read One</Link>
                    <Link className='btn btn-primary m-r-1em' to={'/UpdateProductComponent/' + this.props.product.id} >Edit</Link>
                    <Link className='btn btn-danger' to={'/DeleteProductComponent/' + this.props.product.id} >Delete</Link>
                </td>
            </tr>
        );
    }
}

export default ProductRow;