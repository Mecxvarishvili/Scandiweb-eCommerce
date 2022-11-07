export const serializeAttributes = (data) => {
    if(!!data) {
        return data.map(el => {
            return {id: el.id, value: el.items.slice(-1)[0].value}
        })
    }
}


export const serializeFilterParams = (params) => {
    const value = ["Shoes Size", "Jacket Size", "Color", 'Capacity', 'Touch ID in keyboard', 'With USB 3 ports']
    var valueData = []

    value.forEach(data => {
            const dataa = {
                id: data.replace('Shoes ','').replace('Jacket ',''),
                value: params.get(data) ===  null ? false : params.get(data)
            }
            valueData = [...valueData, dataa]

        
    })

    return valueData
}

export const serializeFilteredProducts = (data, filter) => {
    var newData = []

    if (filter.find(filt => {return filt.value})) {

        filter.forEach(filt => {
            newData = [...newData, ...data.filter(filterData => {
                if (!!filterData.attributes.length && !newData.find(same => {return same.id === filterData.id})) {
                     return filterData.attributes.find(attr => {
                        return attr.id === filt.id && attr.items.find(item => {return item.value === filt.value || item.id.replace("512GB", "512G").replace("256GB", "256G") === filt.value})
                    })
                }
                return false
            })]
    
        })
        return newData
    } else {
        return data
    }
}


export const serializeEndPoints = (products) => {
    const getCurrency = (data) => {
        return data.map(el => el.currency)
    }
    const getCategories = (data) => {
        const categories = data.map(el => el.category)
        return categories.filter((item, index) => categories.indexOf(item) === index)
    }

    const getEndPoints = () => {
        return {
            currency:  getCurrency(products[0].prices),
            categories:  getCategories(products),
        }
    }

    return getEndPoints()
}