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