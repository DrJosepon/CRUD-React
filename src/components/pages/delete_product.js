import React, { Component } from 'react';
import axios from 'axios';
import {
    Link,
    Redirect
} from 'react-router-dom';

class DeleteProductComponent extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            redirect: false
        };
    }


    // onDelete will be here
    // handle single row deletion
    onDelete = (e) => {

        // product to delete
        var productId = this.props.match.params.productId;

        axios.post('http://localhost/api/product/delete.php',
            JSON.stringify({ 'id': productId }),
        )
            .then(function (response) { 
                this.setState({ redirect: true });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    // render will be here
    render() {
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/'/>;
        }
   
        return (
            <div>
                <h1>Delete Product</h1>

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <div className='panel panel-default'>
                            <div className='panel-body text-align-center'>Are you sure?</div>
                            <div className='panel-footer clearfix'>
                                <div className='text-align-center'>
                                    <button onClick={this.onDelete}
                                        className='btn btn-danger m-r-1em'>Yes</button>
                                    <Link className='btn btn-primary' to="/" >No</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        );
    }
}

export default DeleteProductComponent;