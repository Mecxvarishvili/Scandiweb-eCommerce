import cartProducts from "./cart/cartReducer"
import { combineReducers } from "redux"
import productsReducer from "./products/productsReducer"

const allReducer = combineReducers({
    cartProducts,
    productsReducer,
})

const rootReducer = (state, action) => {
    return allReducer(state,action)
}

export default rootReducer