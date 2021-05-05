# E-Commerce CMS Toko Ryan
```
Create Fancy Todo app, using express, axios, vue
* RESTful endpoint with CRUD method
* JSON formatted response
* Web Server response
* Create, Edit, and Delete your Product
```

# Usage
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `npm run dev` to start the server.
Run `npm run serve` to start the client.
```

# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

# ENDPOINT

## POST /login

> Login User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{
  "email": "<User's email>",
  "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
  "token": <token>
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Invalid Email or Password"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /register

> Register User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{ 
  "name": "<User's name>",
  "email": "<User's email>",
  "password": "<User's password>",
  "role": "<User's role (Admin / Customer)>"
}
```

_Response(200)_
```javascript
{
  "name": "<User's name>",
  "email": "<User's email>",
  "password": "<User's password>",
  "role": "<User's role (Admin / Customer)>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Name cannot be empty, Email cannot be empty, Password cannot be empty, Role cannot be empty, Email has been used"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /products

> Get Product List

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Product's ID>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /products

> Add Product

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(201)_
```javascript
{
  "id": "<Product's ID>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Name cannot be empty, Image URL cannot be empty, Price cannot be empty, Stock cannot be empty, Must be an URL, Price must be number, Stock must be number, Price must be greater than zero, Stock must be greater than zero"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /products/:id

> Get Product By ID

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Product's ID>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>",
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PUT /products/:id

> Update Product

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```

_Response(200)_
```javascript
{
  "id": "<Product's ID>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Name cannot be empty, Image URL cannot be empty, Price cannot be empty, Stock cannot be empty, Must be an URL, Price must be number, Stock must be number, Price must be greater than zero, Stock must be greater than zero"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>",
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## DELETE /products/:id

> Delete Product

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "message":  "<Product success deleted>",
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>",
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /customers/:productid

> Add Product To Customer Cart

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "quantity": "<Cart's quantity>"
}
```
_Response(201)_
```javascript
{
  "id": "<Cart's ID>",
  "UserId": "<User's ID>",
  "ProductId": "<Product's ID>",
  "quantity": "<Cart's quantity>",
  "status": "<Cart's status>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Quantity must be greater than zero"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /customers

> Get Product List

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Product's ID>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /customers/history

> Get Customer History Cart

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Cart's ID>",
  "UserId": "<User's ID>",
  "ProductId": "<Product's ID>",
  "quantity": "<Cart's quantity>",
  "status": "<Cart's status>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /customers/:productid

> Get Customer Cart

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Cart's ID>",
  "UserId": "<User's ID>",
  "ProductId": "<Product's ID>",
  "quantity": "<Cart's quantity>",
  "status": "<Cart's status>",
  "name": "<Product's name>",
  "img_url": "<Product's image>",
  "price": "<Product's price>",
  "stock": "<Product's stock>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PATCH /customers/:id

> Add Product To Customer Cart

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
```Not Needed```
```
_Response(201)_
```javascript
{
  "id": "<Cart's ID>",
  "UserId": "<User's ID>",
  "ProductId": "<Product's ID>",
  "quantity": "<Cart's quantity>",
  "status": "<Cart's status>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>", 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## DELETE /customers/:id

> Delete Cart

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "message":  "<Success delete product>",
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token> / <Not Authorized>",
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```