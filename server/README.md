# API Documentation for CoderHouse final project

This file is for identifying and explainig all the API calls within the application.
The application counts with four mayor backend operations: User, Product, Cart and Order.

1.  ## User

    -   ### URL:

        <localhost:4000/register>

    -   ### Method:

        `POST`

    -   ### URL Params:

        Required:

        Optional:

    -   ### Data Params:

        {
        "email": "user.email@hotmail.com",
        "userName": "User Name",
        "password": "1234567"
        }

        email has veritifaction process, if not a real email or if it already exists in the DB, it will throw an error, also password will have to be at least 6-7 characters long.

    -   ### Success Response:

        -   Code: 200
        -   Content: {
            "email": "user.email@hotmail.com",
            "userName": "User Name",
            "password": "1234567"
            }

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

        [Test]
        <This Endpoint is very basic and it's for creating users for the website, minimal authentication as well as some security with password hashing>

2.  Test 2
