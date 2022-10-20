import { DELETE_CART, SET_CART, SET_LOCALSTORAGE_DATA, SET_QUANTITY } from "./cartActionConst";

const initialState = []

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CART:
            var thisState = [...state] 
            var getAtt = JSON.parse(action.payload.attr)
            var newID = action.payload.data.id + action.payload.attr
            if(!thisState.find(data => data.id === action.payload.data.id) || !thisState.find(id => id.newId === newID)) {
                var setData = { ...action.payload.data}
                setData.qty = 1
                setData.attributes = [...getAtt]
                setData.newId = setData.id + action.payload.attr
                return [...state, setData]
            } else {
                var addQty = [...state]
                addQty.find(data => data.newId === newID).qty += 1
                return [...addQty]
            }
        case DELETE_CART:
            var deleteData = state.filter((el) => {return el.newId !== action.payload.newId}) 
            return [...deleteData]
        case SET_QUANTITY:
            var qtyData = [...state]
            qtyData.find(id => id.newId === action.payload.id).qty = action.payload.qty
            
            return[...qtyData]
        case SET_LOCALSTORAGE_DATA:
            return [...action.payload]
        default:
            return state
    }
}
