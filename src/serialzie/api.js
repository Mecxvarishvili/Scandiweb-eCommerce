
const Api = {
    baseApi: (method, url) => {
        return (
            fetch(`https://vmfakeapi.herokuapp.com/sw/`+ url, {
                method: method,
                headers: {"Content-Type": "application/json"},
            })
                .then((res) => res.json())
        )
    },

    fetchSingleProduct: (id) => {
        return Api.baseApi("GET", `/product/${id}`)
    },

    fetchCategoryProduct: (id) => {
        if(id === ""){
            return (Api.baseApi("GET", ""))
        }else {
            return(Api.baseApi("GET", `/category/${id}`))
        }
    }

}

export default Api