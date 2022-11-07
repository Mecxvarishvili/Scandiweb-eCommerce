import { SET_CURRENCY, SET_DATA_ENDPIONTS } from "./productsActionConst";

const initialState = {
    currency: "0",
    dataEndPoints: { currency: [], categories: []}
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENCY:
            localStorage.setItem("Currency", action.payload)
            return {
                ...state,
                currency:  action.payload
            }
        case SET_DATA_ENDPIONTS:
            return { ...state, dataEndPoints: {...action.payload}}
        default:
            return state
    }
}