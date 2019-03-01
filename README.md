## How To

In the root folder
```
npm start  
```

In the api folder

```
nodemon server
```

## Explanation

Web application uses Express js as a backend, the server then connects to the Shopify website using the package 'shopify-api-node' to fetch all the products from the site. Next, using 'mongoose js' we connect to a Mongodb database, we then create Product models out of the list of products (picking out specific information we want to display) and save() the products into the database. The client then makes a request to grab all the products from the database to display.