import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'
import CartLink from '../components/CartLink'

import { useQuery } from "@apollo/client";
import { BACKEND_URL } from "../apollo-client";
import { GET_ALL_PRODUCTS } from '../utils/queries'

const Home = () => {

  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  if (loading) return <h1>loading...</h1>
  if (data) console.log(data)
  if (error) console.log(error)

  const products = data.products.data
  return (
    <>
      <CartLink />
      <div className="w-full">
        <Head>
          <title>Jamstack ECommerce</title>
          <meta name="description" content="Jamstack ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js." />
          <meta property="og:title" content="Jamstack ECommerce" key="title" />
        </Head>
        <div className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag
              year="2021"
              category={products[0].attributes.category.data.attributes.name}
            />
            <Center
              price={products[0].attributes.price}
              title={products[0].attributes.name}
              link={`/product/${products[0].id}`}
            />
            <Footer
              designer={products[0].attributes.brand}
            />
          </div>
          <div className="flex flex-1 justify-center items-center ">
            <Showcase
              imageSrc={BACKEND_URL + products[0].attributes.image.data.attributes.url}
            />
            {/* <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" /> */}
          </div>
        </div>
      </div>
      <div className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      ">
        {products?.slice(1, 3).map(item =>
          <DisplayMedium
            imageSrc={BACKEND_URL + item.attributes.image.data.attributes.url}
            title={item.attributes.name}
            subtitle={item.attributes.price}
            link={`/product/${item.id}`}
          />
        )}
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the house.</p>
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between flex flex-wrap">
        {products?.slice(3).map(item =>
          <DisplaySmall
            imageSrc={BACKEND_URL + item.attributes.image.data.attributes.url}
            title={item.attributes.name}
            subtitle={item.attributes.price}
            link={`/product/${item.id}`}
          />
        )}

      </div>
    </>
  )
}

export default Home