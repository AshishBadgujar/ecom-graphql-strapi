import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { AuthProvider } from '../context/authContext';
import { CartProvider } from 'react-use-cart'
function Ecommerce({ Component, pageProps, categories }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Layout categories={categories}>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce