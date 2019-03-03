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
  }

  fetchProducts = async () => {
    console.log('Importing Products from Shopify');
    console.log('Fetching Products From Database');
    const response = await fetch('/products');
    const products = await response.json();
    this.setState({
      products: products
    });
    console.log(products);
  };

  onBuy = (item) =>{
    alert('Draft Order Sent');
    fetch('/draftOrder', {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        "variant_id": item._id,
        "product_id": item.product_id,
        "title": item.title,
        "price": item.price,
        "quantity": 1,
      })
    })
  };
  render() {
    return (
      <div className="App">
        <h2>Products</h2>
        <div id='container'>
          <table align='center'> 
            <tbody>
              <tr>
                  {this.state.products.map( (product,i) => 
                    <div key={i} id='product-container'>
                      <td>
                      <img src={product.image} alt='' width='278px' height='278px'/>
                      <p>{product.title} <br/> <h3>${product.price.toFixed(2)}</h3></p>                    
                      <button id="buy-button" onClick={() => this.onBuy(product)}>Buy!</button>
                      </td>
                    </div>
                  )}
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default App;
