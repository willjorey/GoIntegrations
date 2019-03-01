import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
    }

  }

  componentDidMount(){
    this.fetchProducts();
  }

  fetchProducts = async () => {
    console.log('Fetching Products From Server')
    const response = await fetch('/api/products');
    const products = await response.json();
    this.setState({
      products: products
    })
    console.log(products)
  }
  render() {
    return (
      <div className="App">
        <h2>Products</h2>
        <ul>
        {this.state.products.map( product => 
          <li>{product.title}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
