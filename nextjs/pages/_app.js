import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { AuthProvider } from '../context/authContext';
import { CartProvider } from 'react-use-cart'
function Ecommerce({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Layout >
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}


export default Ecommerce