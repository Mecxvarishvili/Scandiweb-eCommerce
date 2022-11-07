import { SET_CURRENCY, SET_DATA_ENDPIONTS } from "./productsActionConst"

export const SetCurrency = (data) => {
    return {
        type: SET_CURRENCY,
        payload: data
    }
}

export const setDataEndPoints = (data) => {
    return {
        type: SET_DATA_ENDPIONTS,
        payload: data
    }
}
