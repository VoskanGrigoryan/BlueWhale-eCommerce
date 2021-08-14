# API Documentation for CoderHouse final project

This file is for identifying and explainig all the API calls within the application.
The application counts with four mayor backend operations: User, Product, Cart and Order.

1.  ## User

    -   ### URL:

        _localhost:4000/register_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "email": "user.email@hotmail.com",
            "userName": "User Name",
            "password": "1234567"
        }
        ```

        email has veritifaction process, if not a real email or if it already exists in the DB, it will throw an error, also password will have to be at least 6-7 characters long.

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "email": "user.email@hotmail.com",
                "userName": "User Name",
                "password": "1234567"
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "The provided email is not valid"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "Current email already exists"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "Current password is not valid"
            }

    -   ### Notes:

        _This Endpoint is very basic and it's for creating users for the website, minimal authentication as well as some security with password hashing_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _localhost:4000/login_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "email": "user.email@hotmail.com",
            "password": "1234567"
        }
        ```

        Registered email is provided as well as the password previously set, the function will find the user in the database and get his information, else it will just throw an error saying that the user doesn't exist yet.

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "email": "user.email@hotmail.com",
                "userName": "User Name",
                "id": "ID automatically set by mongoDB that will be used to identify the user later on",
                "refreshToken": "Token for logging in and being set as a cookie"
            }
            ```

    -   ### Error Response:

        -   Code: 404
        -   Content: {
            "error": "There is not a user registered with the given credentials"
            }

    -   ### Notes:

        _This endpoint is for logging in and it will try to find a user with the given credentials, if it doesn't it will let the user know that either the credentials are wrong, or that he needs to register first_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

        -   ### URL:

        _localhost:4000/users_

    -   ### Method:

        `GET`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            [
                {
                    "_id": "611201aa0a4d420be4772438",
                    "email": "hugosajama07@gmail.com",
                    "userName": "Hugo",
                    "password": "$2b$10$w1BkKBX3o1JoExm9bl/O6e8rl8iT9W.zxEvn9qEzTGmDM7EBzmGnC",
                    "__v": 0
                },
                {
                    "_id": "611205aa761122451ce08786",
                    "email": "voskan.grigoryan.arg@gmail.com",
                    "userName": "123123",
                    "password": "$2b$10$aPhwEW.UHYOPgOa1qEMfuusKcKyWZEVj0bwCnEazkglgjfUypFFei",
                    "__v": 0
                }
            ]
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Currently no users in DB"
            }

    -   ### Notes:

        _Basic endpoint for testing, it gets all the users in the DB, without any filtering. This is just for testing and should not be used in the actual application._

2.  ## Products

    -   ### URL:

        _http://localhost:4000/get-products_

    -   ### Method:

        `GET`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

    -   ### Success Response:

        Code: 200
        Content:

        ```json
        [
            {
                "_id": "6110751991c0a40e70ab372a",
                "name": "TEST 3",
                "amount": "2L",
                "description": "Wine",
                "alcoholLevel": "35%",
                "price": 200
            }
        ]
        ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "No products in DB"
            }

    -   ### Notes:

        _Basic endpoint for getting all the products in the database and sending them to frontend for filtering, etc._

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _http://localhost:4000/new-product_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "name": "RED WINE",
            "amount": "1,5L",
            "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam tempore corporis.",
            "alcoholLevel": "35%",
            "price": 400
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:

        ```json
        [
            {
                "_id": "6110751991c0a40e70ab372a",
                "name": "TEST 3",
                "amount": "2L",
                "description": "Wine",
                "alcoholLevel": "35%",
                "price": 200
            }
        ]
        ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Current name already exists"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "Payload has one or more invalid properties"
            }

    -   ### Notes:

        _Basic This endpoint is used for creating a new product, payload is kept small with few properties but more could and should be added later on, such as "creation date" or "discount"_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _http://localhost:4000/update-product_

    -   ### Method:

        `PUT`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "id": "6110751991c0a40e70ab372a",
            "name": "Cerveza Andina",
            "amount": "500Ml",
            "description": "Product description",
            "alcoholLevel": "10%",
            "price": 50
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:

        ```json
        {
            "id": "6110751991c0a40e70ab372a",
            "name": "Cerveza Andina",
            "amount": "500Ml",
            "description": "Product description",
            "alcoholLevel": "10%",
            "price": 50
        }
        ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Product name already exists in DB"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "A product with that name does not exist"
            }

    -   ### Notes:

        _Endpoint used for updating products in DB, takes in the id of the product, send from the frondend, as well as a the new body for the product, then saves it in case the new values don't generate a conflict with previous products_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _http://localhost:4000/delete-product_

    -   ### Method:

        `DELETE`

    -   ### URL Params:

        Required: **?productId=6110751991c0a40e70ab372a**

        Optional:

    -   ### Data Params:

        ```json
        {
            "id": "6110751991c0a40e70ab372a",
            "name": "Cerveza Andina",
            "amount": "500Ml",
            "description": "Product description",
            "alcoholLevel": "10%",
            "price": 50
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:

        ```json
        {
            "message": "Product deleted succesfully!",
            "id": "6110751991c0a40e70ab372a"
        }
        ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error":"A product with that name does not exist"
            }

    -   ### Notes:

        _Endpoint used for deleting products by their ID, this works only individually, meaninig only one product at a time_

3.  ## Cart

    -   ### URL:

        _http://localhost:4000/carts_

    -   ### Method:

        `GET`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            [
                {
                    "products": [
                        {
                            "prodID": "123",
                            "name": "vino",
                            "amount": 2,
                            "description": "Vino importado de mendoza",
                            "alcoholLevel": "35%",
                            "price": 300
                        },
                        {
                            "prodID": "456",
                            "name": "birra",
                            "amount": 6,
                            "description": "Cerveza en lata",
                            "alcoholLevel": "15%",
                            "price": 180
                        }
                    ],
                    "_id": "611614182cf107193875768e",
                    "userID": "611205aa761122451ce08786",
                    "active": true,
                    "creationDate": "2021/08/13 03:41:28",
                    "__v": 0
                }
            ]
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Cart doesn't exist"
            }

    -   ### Notes:

        _This Endpoint is very basic and it's for getting all the carts, this endpoint is just for testing and should not be used in the application_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _localhost:4000/create-cart_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "userEmail": "voskan.grigoryan.arg@gmail.com",
            "active": true,
            "products": []
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "userID": "611201aa0a4d420be4772438",
                "active": true,
                "products": [],
                "creationDate": "2021/08/14 15:57:49"
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Cart already exists for this user"
            }

    -   ### Notes:

        _This endpoint creates the cart for each user, this url would be called once, for each user that gets created, for this example it already has two items in the "products" array, but by default it should come empty, and each item would be uploaded with the next url, which is the add-item url_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _localhost:4000/add-item_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "userEmail": "voskan.grigoryan.arg@gmail.com",
            "products": [
                {
                    "prodID": "123",
                    "name": "vino",
                    "amount": 2,
                    "description": "Vino importado de mendoza",
                    "alcoholLevel": "35%",
                    "price": 300
                },
                {
                    "prodID": "456",
                    "name": "birra",
                    "amount": 6,
                    "description": "Cerveza en lata",
                    "alcoholLevel": "15%",
                    "price": 180
                }
            ]
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:

            ```json
            {
            "products": [
                {
                "prodID": "123",
                "name": "vino",
                "amount": 2,
                "description": "Vino importado de mendoza",
                "alcoholLevel": "35%",
                "price": 300
                },
                {
                "prodID": "456",
                "name": "birra",
                "amount": 6,
                "description": "Cerveza en lata",
                "alcoholLevel": "15%",
                "price": 180
                },
            ], {
                "_id": "611614182cf107193875768e",
                "userID": "611205aa761122451ce08786",
                "active": true,
                "creationDate": "2021/08/13 03:41:28",
                "__v": 0
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Cart doesn't exist or can't be found with the given data"
            }

    -   ### Notes:

        _This endpoint adds items to the "Products" array, it can store multiple ones or a singular object_

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

    -   ### URL:

        _localhost:4000/delete-item_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "cartID": "61146aaba04b4a18b0cdb6e3",
            "userID": "611205aa761122451ce08786",
            "productID": "123"
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "products": [
                    {
                        "prodID": "456",
                        "name": "birra",
                        "amount": 6,
                        "description": "Cerveza en lata",
                        "alcoholLevel": "15%",
                        "price": 180
                    },
                    {
                        "prodID": "456",
                        "name": "birra",
                        "amount": 6,
                        "description": "Cerveza en lata",
                        "alcoholLevel": "15%",
                        "price": 180
                    }
                ],
                "_id": "611614182cf107193875768e",
                "userID": "611205aa761122451ce08786",
                "active": true,
                "creationDate": "2021/08/13 03:41:28",
                "__v": 0
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Provided params are not valid"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "Can't find cart by the provided ID"
            }

    -   ### Notes:

        _This endpoint deletes an item at a time from the "Products" array, it takes in the "userID", the "cartID" and the ID of the product that you want to delete_

4.  ## Order

    -   ### URL:

        _http://localhost:4000/create-order_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "userID": "611205aa761122451ce08786",
            "cart": {
                "products": [
                    {
                        "prodID": "123",
                        "name": "vino",
                        "amount": 2,
                        "description": "Vino importado de mendoza",
                        "alcoholLevel": "35%",
                        "price": 300
                    },
                    {
                        "prodID": "456",
                        "name": "birra",
                        "amount": 6,
                        "description": "Cerveza en lata",
                        "alcoholLevel": "15%",
                        "price": 180
                    }
                ],
                "_id": "61146aaba04b4a18b0cdb6e3",
                "userID": "611205aa761122451ce08786",
                "active": true,
                "creationDate": "2021/08/11 21:26:19",
                "__v": 0
            },
            "orderTime": "2021/08/11",
            "arrivalTime": "2021/08/13",
            "deliveryCost": 40
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "userID": "611205aa761122451ce08786",
                "cart": [
                    {
                        "prodID": "123",
                        "name": "vino",
                        "amount": 2,
                        "description": "Vino importado de mendoza",
                        "alcoholLevel": "35%",
                        "price": 300
                    },
                    {
                        "prodID": "456",
                        "name": "birra",
                        "amount": 6,
                        "description": "Cerveza en lata",
                        "alcoholLevel": "15%",
                        "price": 180
                    }
                ],
                "orderTime": "2021/08/11",
                "arrivalTime": "2021/08/13",
                "deliveryCost": 40
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "User ID is not valid"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "No products in shopping cart"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "No valid order time"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "No valid arrival time"
            }

        OR

        -   Code: 409
        -   Content: {
            "error": "Delivery cost value is not valid"
            }

    -   ### Notes:

        _This endpoint creates the payload taking the userID, which later is used to get the user data, the products within the cart that belongs to the user in question, as well as generic data like arrival time and delivery cost._

        //----------------------------------------------------------- NEXT API CALL -------------------------------------------------------------//

        -   ### URL:

        _http://localhost:4000/create-order_

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        ```json
        {
            "userID": "611205aa761122451ce08786"
        }
        ```

    -   ### Success Response:

        -   Code: 200
        -   Content:
            ```json
            {
                "alert": "CONGRATS YOU CONFIRMED YOUR PRODUCT, YOU'LL BE RECEIVING IT IN THE NEXT 4-5 BUSINESS DAYS!"
            }
            ```

    -   ### Error Response:

        -   Code: 409
        -   Content: {
            "error": "Order does not exist with this ID"
            }

    -   ### Notes:

        _This endpoint only takes in the userID in order to find the order it belongs to, confirms the purchase, and then sends an email to the user notifying them and showing the products they bought._
