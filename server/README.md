# API Documentation for CoderHouse final project

This file is for identifying and explainig all the API calls within the application.
The application counts with four mayor backend operations: User, Product, Cart and Order.

1.  ## User

    -   ### URL:

        < localhost:4000/register >

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

        <This Endpoint is very basic and it's for creating users for the website, minimal authentication as well as some security with password hashing>

        //------------------------------------------ NEXT API CALL ------------------------------------------//

    -   ### URL:

        < localhost:4000/login >

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

        <This endpoint is for logging in and it will try to find a user with the given credentials, if it doesn't it will let the user know that either the credentials are wrong, or that he needs to register first>

2.  ## Products

            -   ### URL:

                < http://localhost:4000/get-products >

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
                [{
                    "_id": "6110751991c0a40e70ab372a",
                    "name": "TEST 3",
                    "amount": "2L",
                    "description": "Wine",
                    "alcoholLevel": "35%",
                    "price": 200,
                }]
                ```

            -   ### Error Response:

                -   Code: 409
                -   Content: {
                    "error": "No products in DB"
                    }

            -   ### Notes:

                <Basic endpoint for getting all the products in the database and sending them to frontend for filtering, etc.>

                //------------------------------------------ NEXT API CALL ------------------------------------------//

            -   ### URL:

                < http://localhost:4000/new-product >

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
                     [{
                    "_id": "6110751991c0a40e70ab372a",
                    "name": "TEST 3",
                    "amount": "2L",
                    "description": "Wine",
                    "alcoholLevel": "35%",
                    "price": 200,
                    }]
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

                <Basic This endpoint is used for creating a new product, payload is kept small with few properties but more could and should be added later on, such as "creation date" or "discount">

                //------------------------------------------ NEXT API CALL ------------------------------------------//

            -   ### URL:

                < http://localhost:4000/update-product >

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
                 [{
                    "_id": "6110751991c0a40e70ab372a",
                    "name": "TEST 3",
                    "amount": "2L",
                    "description": "Wine",
                    "alcoholLevel": "35%",
                    "price": 200,
                    }]
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

                < Endpoint used for updating products in DB, takes in the id of the product, send from the frondend, as well as a the new body for the product, then saves it in case the new values don't generate a conflict with previous products >
