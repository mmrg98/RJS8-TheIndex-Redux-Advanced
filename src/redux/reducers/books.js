import {FETCH_BOOKS} from "../actions/actionType";

const initialState = {
    books: [],
    loading: true
  };

const reducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_BOOKS:
            return{
                ...state,
                books: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;