import { SET_CURRENCY, SET_PRODUCTS } from "./productsActionConst";

const initialState = {
    currency: "USD",
    Products: [],
    singleProduct: []
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currency:  action.payload
            }
        case SET_PRODUCTS:
            var data = [1]
            return {
                ...state,
                Products: {...state.Products, data}
            }
        default:
            return state
    }
}