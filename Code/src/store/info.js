export default function info(state = '', action) {
    switch(action.type) {
        case 'NEW_INFO':
            return state = action.data;
        default:
            return state;
    }
}