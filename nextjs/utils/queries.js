import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
query getAllProducts{
    products {
      data{
        id
        attributes{
          name
          description
          price
          brand
          category{
            data{
              attributes{
                name
              }
            }
          }
          image{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
  `

export const GET_PRODUCT = gql`
query getProductById($id:ID!){
    product(id: $id){
      data{
        id
        attributes{
          name
          price
          description
          brand
          category{
            data{
              attributes{
                name
              }
            }
          }
          image{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ALL_CATEGORIES = gql`
query Categories {
  categories {
    data {
      id
      attributes {
        name
      }
    }
  }
}
`
export const GET_PRODUCT_BY_CATEGORY = gql`
query Category($categoryId: ID!) {
  category(id: $categoryId) {
    data {
      attributes {
        name
        products {
          data {
            id
            attributes {
              name
              price
              description
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const GET_PRODUCT_BY_FILTER = gql`
query Products($filters: ProductFiltersInput) {
  products(filters: $filters) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
`
