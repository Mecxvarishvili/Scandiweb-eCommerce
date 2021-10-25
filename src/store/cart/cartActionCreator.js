import { DELETE_CART, SET_CART, SET_QUANTITY } from "./cartActionConst"

export const SetCart = (data) => {
    return {
        type: SET_CART,
        payload: data
    }
} 

export const DeleteCart = (data) => {
    return {
        type: DELETE_CART,
        payload: data,
    }
}

export const SetQuantity = (id, qty) => {
    return {
        type: SET_QUANTITY,
        payload: {id, qty},
    }
}