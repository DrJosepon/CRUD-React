import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class TopActionsComponent extends Component{
    render() {
        return (
            <div>
                <Link className='btn btn-primary margin-bottom-1em' to="/CreateProductComponent" >Create products</Link>
            </div>
        );
    }
}

export default TopActionsComponent;