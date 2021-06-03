export default function data(state = {}, action) {
    switch(action.type) {
        case 'UPDATE':
            return state = action.data;
        default:
            return state;
    }
}