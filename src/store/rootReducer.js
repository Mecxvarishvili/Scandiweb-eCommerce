import cartProducts from "./cart/cartReducer"
import { combineReducers } from "redux"

const allReducer = combineReducers({
    cartProducts
})

const rootReducer = (state, action) => {
    return allReducer(state,action)
}

export default rootReducer