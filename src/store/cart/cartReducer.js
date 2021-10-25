import { DELETE_CART, SET_CART, SET_QUANTITY } from "./cartActionConst";

const initialState = []

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CART:
            var setData = action.payload
            setData.qty = 1
            return [...state, setData]
        case DELETE_CART:
            var deleteData = state.filter((el) => {return el.id !== action.payload.id}) 
            return [...deleteData]

        case SET_QUANTITY:
            var qtyData = [...state]
            qtyData.find(id => id.id === action.payload.id).qty = action.payload.qty
            
            return[...qtyData]
        default:
            return state
    }
}