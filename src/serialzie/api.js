const Api = {
    baseApi: (url) => {
        return (
            fetch(`https://vmfakeapi.onrender.com/sw/${url}`)
                .then((res) => res.json())
        )
    },

    fetchSingleProduct: (id) => {
        return Api.baseApi(`product/${id}`)
    },

    fetchCategoryProduct: (id) => {
        if(id === "") {
            return Api.baseApi("")
        } else {
            return Api.baseApi(`category/${id}`)
        }
    }

}

export default Api