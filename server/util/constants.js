const errors = {
    nameExists: 'Current name already exists',
    userDoesntExist: "User doesn't exist with current email",
    passwordInvalid: 'Current password is not valid',

    noOrderTime: 'No valid order time',
    noArrivalTime: 'No valid arrival time',
    noDeliveryCost: 'Delivery cost value is not valid',

    currentParamsNotValid: 'Provided params are not valid',
    orderDoesntExist: 'Order does not exist with this ID',

    //cart
    noCartsInDB: 'No shopping carts in DB',
    cartExists: 'Cart already exists for this user',
    cartDoesntExist: "Cart doesn't exist or can't be found with the given data",
    cantCartFindById: "Can't find cart by the provided ID",

    //products
    productNameExists: 'Product name already exists in DB',
    noProductsInCart: 'No products in shopping cart',
    productDoesntExist: 'A product with that name does not exist',

    //payload
    noPayload: 'Payload is empty',
    invalidPayload: 'Payload is not valid',
    payloadInvalid: 'Payload has one or more invalid properties',

    //user
    userIDInvalid: 'User ID is not valid',
    userDoesNotExist: 'There is not a user registered with the given credentials',
    userNameExists: 'Username already exists',
    userNameInvalid: 'Username is not valid or is empty',
    unathorizedLogin: 'Unathorized Login attempt',

    //email
    emailNotValid: 'The provided email is not valid',
    emailExists: 'Current email already exists',

    //phone number
    phoneNotValid: 'Phone is not valid',
    phoneExistsInDB: 'Phone exists in Database',

    //Address
    addressExists: 'Address already exists in database',
    addressNumberNotValid: 'Address number not valid',
};

const alerts = {
    noProducts: 'Currently no entries in DB',
    noUsers: 'Currently no users in DB',
};

const notifications = {
    success: 'Success!',
};

export { errors, notifications, alerts };
