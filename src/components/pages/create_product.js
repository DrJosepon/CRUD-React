import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

class CreateProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: '',
            successCreation: null
        };

        this.onCategoryChange = this.onCategoryChange.bind(this);
    };


    // on mount, get all categories and store them in this component's state
    componentDidMount() {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();

        this.serverrequest = axios.get(`http://localhost/api/category/read.php`, { cancelToken: this.source.token })
            .then(function (categories) {
                console.log(categories.data.records);
                this.setState({
                    categories: categories.data.records
                });
            }.bind(this));

    };

    // on unmount, stop getting categories in case the request is still loading
    componentWillUnmount = () => {
        this.source.cancel();
    };

    // handle form field changes here
    // handle category change
    onCategoryChange(e) {
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

    // handle save button clicked
    onSave = (e) => {

        // data in the form
        var form_data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        };

        axios.post('http://localhost/api/product/create.php',
            JSON.stringify(form_data),
        )
            .then(function (response) {
                // api message
                this.setState({ successCreation: response.data.message });

                // empty form
                this.setState({ name: "" });
                this.setState({ description: "" });
                this.setState({ price: "" });
                this.setState({ selectedCategoryId: -1 });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    };

    // render component here
    render() {

        // make categories as option for the select tag.
        var categoriesOptions = this.state.categories.map(function (category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        /*
        - tell the user if a product was created
        - tell the user if unable to create product
        - button to go back to products list
        - form to create a product
        */
        return (
            <div>
                <h1>Create Product</h1>
                {

                    this.state.successCreation === "Product was created." ?
                        <div className='alert alert-success'>
                            Product was saved.
                </div>
                        : null
                }

                {

                    this.state.successCreation === "Unable to create product." ?
                        <div className='alert alert-danger'>
                            Unable to save product. Please try again.
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
                                        onChange={this.onDescriptionChange}>
                                    </textarea>
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
                                        onClick={this.onSave}>Save</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default CreateProductComponent;