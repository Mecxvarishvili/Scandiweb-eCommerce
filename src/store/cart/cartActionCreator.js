import { DELETE_CART, SET_CART } from "./cartActionConst"

export const setCart = (data) => {
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