import { SET_CURRENCY } from "./productsActionConst";

const initialState = {
    currency: "USD",
    Products: []
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currency:  action.payload
            }
        default:
            return state
    }
}