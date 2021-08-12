const data = [];

// eslint-disable-next-line
export default (info = data, action) => {
    switch (action.type) {
        case 'CREATE_CART':
            return [...info, ...action.payload];
        case 'GET_CARTS':
            return [...action.payload];
        case 'UPDATE_CART':
            return [...info, ...action.payload];
        case 'DELETE_CART':
            return [...info, ...action.payload];
        default:
            return info;
    }
};
