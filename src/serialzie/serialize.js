export const serializeAttributes = (data) => {
    if(!!data) {
        return data.map(el => {
            return {id: el.id, value: el.items.slice(-1)[0].value}
        })
    }
}