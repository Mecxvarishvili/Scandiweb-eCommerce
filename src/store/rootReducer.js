import cart from "./cart/cartReducer"
import { combineReducers } from "redux"

const allReducer = combineReducers({
    cart
})

const rootReducer = (state, action) => {
    return allReducer(state,action)
}

export default rootReducer