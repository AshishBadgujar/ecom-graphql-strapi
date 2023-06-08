import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <ApolloProvider client={client}>
      <Layout categories={categories}>
        <Component {...pageProps} />
      </Layout>
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