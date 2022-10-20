import { SET_CURRENCY, SET_PRODUCTS } from "./productsActionConst";

const initialState = {
    currency: "0",
    Products: [],
    singleProduct: []
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENCY:
            localStorage.setItem("Currency", action.payload)
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