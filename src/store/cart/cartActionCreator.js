import { DELETE_CART, SET_CART } from "./cartActionConst"

export const setCart = () => {
    return {
        type: SET_CART,
        paylaod: 0
    }
} 

export const DeleteCart = () => {
    return {
        type: DELETE_CART,
        payload: 0,
    }
}