import { CATEGORY_QUERY, CATEGORY_QUERY_FILTER, SINGLE_PRODUCT_QUERY } from "./querySerialize"

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

    fetchCategoryProduct: (location, id) => {
        if(location) {
            return(Api.baseApi(CATEGORY_QUERY))
        } else {
            return (Api.baseApi(CATEGORY_QUERY_FILTER(id)))
        }
    }

}

export default Api