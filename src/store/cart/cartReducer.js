import { DELETE_CART, SET_CART, SET_QUANTITY } from "./cartActionConst";

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
                var addQyt = [...state]
                addQyt.find(data => data.newId === newID).qty += 1
                return [...addQyt]
            }
        case DELETE_CART:
            var deleteData = state.filter((el) => {return el.newId !== action.payload.newId}) 
            return [...deleteData]
        case SET_QUANTITY:
            var qtyData = [...state]
            qtyData.find(id => id.newId === action.payload.id).qty = action.payload.qty
            
            return[...qtyData]
        default:
            return state
    }
}

/* if(!state.find(data => data.id === action.payload.data.id)/* thisData.find((el) => el.attr.find((att) => att.id === action.payload.attr.id && att.value === action.payload.attr.value)) ) {
    var setData = action.payload.data
    setData.qty = 1
    setData.attr = [...action.payload.attr]
    return [...state, setData]
} else {
    /* if(JSON.stringify(state.find(data => data.id === action.payload.data.id).attr) === JSON.stringify(action.payload.attr)) {
        var setQty = [...state]
        setQty.find(data => data.id === action.payload.data.id).qty +=1

        return [JSON.stringify(state.find(data => data.id === action.payload.data.id).attr) === JSON.stringify(action.payload.attr)]
    } else {
        var setData = action.payload.data
        setData.qty = 1
        setData.attr = [action.payload.data]
        return [...state, setData]

    }
    return thisData
} */