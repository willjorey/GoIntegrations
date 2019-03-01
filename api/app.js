const express = require('express');
const app = express();
const mongoose = require('mongoose');
const password = 'i9asgYfGpWXIf1Tl';

const Product = require('./models/product')

mongoose.connect('mongodb+srv://William:'+ password +'@mycluster-gea94.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })

const Shopify = require('shopify-api-node');
 
const shopify = new Shopify({
  shopName: 'gointegrations-devtest.myshopify.com',
  apiKey: 'edd7fd7dac31cb81df28f91455649911',
  password: '330c304080eb8a70845b94ad0269bc50'
});

//Get products from Shopify and Import the products to the database
shopify.product.list().then( res => {
    for (let item of res){
        if(item.title !== 'Testing'){
            var product = new Product({
                _id: item.id,
                title: item.title,
                image: item.image.src
            })
            product.save()
        }
    }
}
)

app.get('/products', (req, res) => {
    Product.find().exec().then(doc => {
        console.log('From Database', doc)
        res.status(200).json(doc);
    })
})

app.get('/api/priceRule', async (req, res) => {
    const product = await shopify.priceRule.list();
    res.json(product)
});

module.exports = app;