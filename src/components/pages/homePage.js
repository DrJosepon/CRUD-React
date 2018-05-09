import React, { Component } from 'react';
import axios from 'axios';


import ProductsTable from './product_table';
import TopActionsComponent from './top_actions';


class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.serverrequest = axios.get(`http://localhost/api/product/read.php`)
      .then(function (response) {
        console.log(response.data.records);
        this.setState({
          items: response.data.records
        });
      }.bind(this));
  }

  render() {
    const { items } = this.state;
    return (
      <div className="container-fluid">
        <h1>Homepage content</h1>
        {/*         
        <p>
          {items.map(item => (
            <li key={item.id}>
              {item.description}
            </li>
          ))}

        </p> */}

        <div className='overflow-hidden'>
          <TopActionsComponent changeAppMode={this.props.changeAppMode} />

          <ProductsTable
            products={items}
            changeAppMode={this.props.changeAppMode} />
        </div>
      </div>
    );
  }

}

export default Homepage;
