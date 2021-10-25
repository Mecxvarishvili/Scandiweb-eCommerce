export const CATEGORY_QUERY = `
query Category {
  category {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency
        amount
      }
      brand
    }
  }
}
`

export const CATEGORY_QUERY_FILTER = (category) => `
query Category {
  category(input: { title: "${category}" }) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency
        amount
      }
      brand
    }
  }
}
`

export const CATEGORIES_QUERY = `
query Categories {
  categories{
    name
    products {
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
          prices{
            currency
            amount
          }
          brand
        }
  }
}
`

export const SINGLE_PRODUCT_QUERY = (id) => `
query product {
  product(id: "${id}") {
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
          prices{
            currency
            amount
          }
          brand
  }
}

`