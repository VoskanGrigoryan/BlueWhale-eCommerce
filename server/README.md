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
        "userName":" User Name",
        "password":"1234567"
        }

        //email has veritifaction process, if not a real email will throw an error
        //password will have to be at least 6-7 characters long

2.  Test 2
