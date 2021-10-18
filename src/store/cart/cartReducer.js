import { DELETE_CART, SET_CART } from "./cartActionConst";

const initialState = []

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CART:
            return [...state, action.payload]
        case DELETE_CART:
            var data = state.filter((el) => {return el.id !== action.payload.id}) 

        return [...data, ]

        default:
            return state
    }
}