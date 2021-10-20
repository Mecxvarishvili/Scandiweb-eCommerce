import { SET_CURRENCY } from "./productsActionConst"

export const SetCurrency = (data) => {
    return {
        type: SET_CURRENCY,
        payload: data
    }
}