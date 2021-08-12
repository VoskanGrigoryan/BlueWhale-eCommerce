const data = [];

// eslint-disable-next-line
export default (info = data, action) => {
    switch (action.type) {
        case 'CREATE_ORDER':
            return [...info, ...action.payload];
        case 'CANCEL_ORDER':
            return [...info, ...action.payload];
        case 'EDIT_ORDER':
            return [...info, ...action.payload];
        case 'CONFIRM_ORDER':
            return [...info, ...action.payload];
        default:
            return info;
    }
};
