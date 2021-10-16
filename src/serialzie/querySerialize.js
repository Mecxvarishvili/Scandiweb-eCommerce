import gql from "graphql-tag"

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

export const CATEGORIES_QUERY = gql`
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

export const SINGLE_PRODUCT_QUERY = (pathname) => `
query product {
  product(id: "${pathname}") {
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