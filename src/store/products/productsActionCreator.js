import { SET_CURRENCY, SET_PRODUCTS } from "./productsActionConst"

export const SetCurrency = (data) => {
    return {
        type: SET_CURRENCY,
        payload: data
    }
}

export const setProductData = (params, data) => {
    return {
        type: SET_PRODUCTS,
        payload: {params, data},
    }
}