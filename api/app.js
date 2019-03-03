const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const password = 'i9asgYfGpWXIf1Tl';

const Product = require('./models/product');

mongoose.connect('mongodb+srv://William:'+ password +'@mycluster-gea94.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Shopify = require('shopify-api-node');
 
const shopify = new Shopify({
  shopName: 'gointegrations-devtest.myshopify.com',
  apiKey: 'edd7fd7dac31cb81df28f91455649911',
  password: '330c304080eb8a70845b94ad0269bc50'
});

//This function checks whether the id of the product exists in the database, if not save the 'product'
productExist = async (id, product) =>{
    let exist = await Product.findById(id);
    //if id doesn't exist in db save
    if (!exist){
        product.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
    }else{
        console.log('PRODUCT EXISTS')
    }
}

//Get products from Shopify and Import the products to the database
shopify.product.list().then( res => {
    for (let item of res){
        if(item.title !== 'Testing'){
            var product = new Product( obj = {
                _id: item.variants[0].id,
                product_id: item.variants[0].product_id,
                title: item.title,
                image: item.image.src,
                price: item.variants[0].price * 0.75
            });
            productExist(item.variants[0].id, product);
        }
    }
});

app.get('/products', (req, res) => {
    Product.find().exec().then(doc => {
        console.log('From Database', doc)
        res.status(200).json(doc);
    })
})

app.post('/draftOrder', (req, res) => {
    let id = req.body.variant_id;
    let product_id = req.body.product_id;
    let title = req.body.title;
    let price = req.body.price;
    var order = {
        "line_items": [
            {
                "variant_id": Number(id),
                "product_id": Number(product_id),
                "title": title,
                "price": price,
                "quantity":1
            }
        ]
    };
    shopify.draftOrder.create(order)
    .then( res => {
        console.log('DRAFT ORDER SENT',res);
        res.status(201).json({
            message: "Handling POST requests to /draftOrder",
            draft_order: order,
          });
    })
    .catch( err => console.log('ERROR MESSAGE:',err))

});

module.exports = app;