// Load express
const express = require('express');

// import the controller
const getData = require('./Controllers/getData');
const products = require('./Models/products');

// Call the get data
const productsData = getData();

// Initialize express app
const app = express();
const PORT = 3000;

//Middleware function
// updates the request as soon as they come in
app.use((req, res, next) => {
    console.log('Running middleware function!!')
    next(); //gets to the next middleware or to the response
});

//JSON Middleware
app.use(express.json())
//if we don't need to read data from the url
app.use(express.urlencoded({extended: false}))

//Set up view engine
app.set('view engine', 'ejs')
app.set('views', './Views')

//Root route
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        pageHeader: 'Home Page'
    });
});

//Shows all the products
app.get('/products', (req, res) => {
    res.render('products', {data: productsData, pageTitle: 'Products Page'});
});

// Create a new product form
app.get('/products/new', (req, res) => {
    res.render('new-product')
})

app.get('/products/:id', (req, res) => {
    console.log(req.params);
    const result = products.filter(item => item.id === Number(req.params.id))
    
    res.render('productId', {product: result[0]})
})

//Create new products
app.post('/products', (req, res) => {
    console.log(req.body);

    productsData.push(req.body)
})


//App Listener
app.listen(PORT, () => {
    console.log(`You are up and running on port: ${PORT}`);
})