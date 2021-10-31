import { CATEGORY_QUERY, SINGLE_PRODUCT_QUERY } from "./querySerialize"

const Api = {
    baseApi: (query) => {
        return (
            fetch('http://localhost:4000/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query: query})
            })
                .then((res) => res.json())
        )
    },

    fetchSingleProduct: (id) => {
        return Api.baseApi(SINGLE_PRODUCT_QUERY(id))
    },

    fetchCategoryProduct: (id) => {
        return (Api.baseApi(CATEGORY_QUERY(id)))
    }

}

export default Api