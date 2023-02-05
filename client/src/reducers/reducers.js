let auth_token;

if(localStorage.getItem('redux_auth')){
    auth_token = JSON.parse(localStorage.getItem('redux_auth'));

}
else{
    auth_token = null;
}

export const authReducer = (state = auth_token, action) => {
    switch(action.type){
        case "LOGGED_IN":
            return {...state, ...action.payload};
        case "LOOGED_OUT":
            return action.payload;
        default:
            return state;
    }

}