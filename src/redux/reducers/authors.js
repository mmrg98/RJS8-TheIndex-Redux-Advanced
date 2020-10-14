import {FETCH_AUTHORS} from "../actions";

const initialState = {
    authors: [],
    loading: true
  };

const reducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_AUTHORS:
            return{
                ...state,
                authors: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;