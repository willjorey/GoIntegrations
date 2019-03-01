const express = require('express');
const app = express();
const PORT = 4000;

const Shopify = require('shopify-api-node');
 
const shopify = new Shopify({
  shopName: 'gointegrations-devtest.myshopify.com',
  apiKey: 'edd7fd7dac31cb81df28f91455649911',
  password: '330c304080eb8a70845b94ad0269bc50'
});

// const products = shopify.product.list().then(res => {
//     console.log(res)
// });

app.get('/api/products', (req, res) => {
    // const list = [{id:1}, {id:2}]
    // res.json(list)
    shopify.product.list().then(products => {
        console.log(products);
        res.json(products)
    });
})

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});

