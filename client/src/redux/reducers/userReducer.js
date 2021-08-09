const data = [];

export default (info = data, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return [...info, action.payload];
        case 'LOGIN_USER':
            return [...info, action.payload];
        default:
            return info;
    }
};
