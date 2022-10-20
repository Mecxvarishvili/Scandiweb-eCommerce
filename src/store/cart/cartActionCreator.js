import { DELETE_CART, SET_CART, SET_LOCALSTORAGE_DATA, SET_QUANTITY } from "./cartActionConst"

export const SetCart = (data, attributes) => {
    return {
        type: SET_CART,
        payload: {data: data, attr: attributes}
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

export const SetLocalStorageData = (data) => {
    return {
        type: SET_LOCALSTORAGE_DATA,
        payload: data
    }
}