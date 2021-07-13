
const genreReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH':
            return action.payload
        break;
        
        default:
            throw new Error('Please type a valid action type')
            break;
    }
}


export default genreReducer