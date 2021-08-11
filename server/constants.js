const errors = {
    emailExists: 'Current email already exists',
    nameExists: 'Current name already exists',
    userDoesntExist: "User doesn't exist with current email",
    productDoesntExist: 'A product with that name does not exist',
    passwordInvalid: 'Current password is not valid',
    payloadInvalid: 'Payload has one or more invalid fields',
};

const alerts = {
    noProducts: 'Currently no entries in DB',
    noUsers: 'Currently no users in DB',
};

const notifications = {
    success: 'Success!',
};

export { errors, notifications, alerts };
