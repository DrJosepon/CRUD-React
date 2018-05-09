import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

class ReadOneProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        };
    }

    // on mount, read product data and them as this component's state
    componentDidMount() {

        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();

        var productId = this.props.match.params.productId;

        this.serverrequest = axios.get(`http://localhost/api/product/read_one.php?id=` + productId, {
            cancelToken: this.source.token
        })
            .then(function (product) {
                this.setState({ category_name: product.data.category_name });
                this.setState({ id: product.data.id });
                this.setState({ name: product.data.name });
                this.setState({ description: product.data.description });
                this.setState({ price: product.data.price });
            }.bind(this));

    };

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount() {
        this.source.cancel();
    };

    // render component html will be here
    render() {

        return (
            <div>

                <h1>Read Product</h1>
                <Link className='btn btn-primary margin-bottom-1em' to="/" >Read Products</Link>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>

                            <tr>
                                <td>Description</td>
                                <td>{this.state.description}</td>
                            </tr>

                            <tr>
                                <td>Price ($)</td>
                                <td>${parseFloat(this.state.price).toFixed(2)}</td>
                            </tr>

                            <tr>
                                <td>Category</td>
                                <td>{this.state.category_name}</td>
                            </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneProductComponent;