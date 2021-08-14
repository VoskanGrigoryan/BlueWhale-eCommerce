const errors = {
    emailExists: 'Current email already exists',
    nameExists: 'Current name already exists',
    userDoesntExist: "User doesn't exist with current email",
    productDoesntExist: 'A product with that name does not exist',
    passwordInvalid: 'Current password is not valid',
    payloadInvalid: 'Payload has one or more invalid properties',
    cartExists: 'Cart already exists for this user',
    cartDoesntExist: "Cart doesn't exist",
    cantCartFindById: "Can't find cart by the provided ID",
    productNameExists: 'Product name already exists in DB',
    noProductsInCart: 'No products in shopping cart',
    noOrderTime: 'No valid order time',
    noArrivalTime: 'No valid arrival time',
    noDeliveryCost: 'Delivery cost value is not valid',
    noCartsInDB: 'No shopping carts in DB',
    userIDInvalid: 'User ID is not valid',
    currentParamsNotValid: 'Provided params are not valid',
    orderDoesntExist: 'Order does not exist',
    emailNotValid: 'The provided email is not valid',
    userDoesNotExist: 'There is not a user registered with the given credentials',
};

const alerts = {
    noProducts: 'Currently no entries in DB',
    noUsers: 'Currently no users in DB',
};

const notifications = {
    success: 'Success!',
};

export { errors, notifications, alerts };
