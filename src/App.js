import React, { Component } from 'react';
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
    this.fetchPrice();
  }

  fetchProducts = async () => {
    console.log('Fetching Products From Server')
    const response = await fetch('/products');
    const products = await response.json();
    this.setState({
      products: products
    });
    console.log(products)
  };

  fetchPrice = async () =>{
    console.log('Fetching Price');
    const response = await fetch('/api/priceRule');
    const price = await response.json();
    console.log(price);
  }
  render() {
    return (
      <div className="App">
        <h2>Products</h2>
        <ul>
        {this.state.products.map( (product,i) => 
          <div key={i}>
          <img src={product.image} alt='' width='100px' height='100px'/>
          <li>{product.title} </li>
          </div>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
