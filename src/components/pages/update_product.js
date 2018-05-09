import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

class UpdateProductComponent extends Component{
     
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null
        };
      };

    // on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount() {

        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();

        this.serverRequestCat = axios.get(`http://localhost/api/category/read.php`, { cancelToken: this.source.token })
            .then(function (categories) {
                console.log(categories.data.records);
                this.setState({
                    categories: categories.data.records
                });
            }.bind(this));

        // read one product data
        var productId = this.props.match.params.productId;
        this.serverRequestCat = axios.get(`http://localhost/api/product/read_one.php?id=` + productId, { cancelToken: this.source.token })
        .then(function (product) { 
            this.setState({ selectedCategoryId: product.data.category_id });
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

    // handle form field changes here
    // handle category change
    onCategoryChange = (e) => {
        this.setState({ selectedCategoryId: e.target.value });
    };

    // handle name change
    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    // handle description change
    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    // handle price change
    onPriceChange = (e) => {
        this.setState({ price: e.target.value });
    };

    // handle save changes button here
    // handle save changes button clicked
    onSave = (e) => {

        // data in the form
        var form_data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        };
 

        axios.post('http://localhost/api/product/update.php',
        JSON.stringify(form_data),
    )
        .then(function (response) {
            this.setState({ successUpdate: response.data.message });
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });

        e.preventDefault();
    };

    // render component here
    render()  {
        var categoriesOptions = this.state.categories.map(function (category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate === "Product was updated." ?
                        <div className='alert alert-success'>
                            Product was updated.
                    </div>
                        : null
                }

                {
                    this.state.successUpdate === "Unable to update product." ?
                        <div className='alert alert-danger'>
                            Unable to update product. Please try again.
                    </div>
                        : null
                }

                 <Link className='btn btn-primary margin-bottom-1em' to="/" >Read Products</Link>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={this.state.name}
                                        required
                                        onChange={this.onNameChange} />
                                </td>
                            </tr>

                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        required
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}></textarea>
                                </td>
                            </tr>

                            <tr>
                                <td>Price ($)</td>
                                <td>
                                    <input
                                        type='number'
                                        step="0.01"
                                        className='form-control'
                                        value={this.state.price}
                                        required
                                        onChange={this.onPriceChange} />
                                </td>
                            </tr>

                            <tr>
                                <td>Category</td>
                                <td>
                                    <select
                                        onChange={this.onCategoryChange}
                                        className='form-control'
                                        value={this.state.selectedCategoryId}>
                                        <option value="-1">Select category...</option>
                                        {categoriesOptions}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default UpdateProductComponent;