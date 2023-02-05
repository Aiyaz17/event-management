export default rootReducer = (state = intitalState, action) => {
    switch(action.type){
        case "LOGGED_IN":
            return {...state, ...action.payload};
        case "LOOGED_OUT":
            return action.payload;
        default:
            return state;
    }

}