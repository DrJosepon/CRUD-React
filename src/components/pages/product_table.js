import React, { Component } from 'react';

import ProductRow from './product_table_row';

class ProductsTable extends Component{
    render() {

        var rows = this.props.products
            .map(function (product, i) {
                return (
                    <ProductRow
                        key={i}
                        product={product}
                        />
                );
            });

        return (
            !rows.length
                ? <div className='alert alert-danger'>No products found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}
 

export default ProductsTable;