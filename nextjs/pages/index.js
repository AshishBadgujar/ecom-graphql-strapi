import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'
import CartLink from '../components/CartLink'

import { gql, useQuery } from "@apollo/client";
import client, { BACKEND_URL } from "../apollo-client";
import { GET_ALL_PRODUCTS } from '../utils/queries'

const Home = ({ inventoryData = [], categories: categoryData = [] }) => {


  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  console.log("inventory=", inventoryData)
  if (loading) return <h1>loading...</h1>
  if (data) {
    console.log("data=", data)
  }
  const inventory = inventoryData.slice(0, 4)
  const categories = categoryData.slice(0, 2)

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
              category={data.products.data[0].attributes.category.data.attributes.name}
            />
            <Center
              price={data.products.data[0].attributes.price}
              title={data.products.data[0].attributes.name}
              link={`/product/${slugify(data.products.data[0].attributes.name)}`}
            />
            <Footer
              designer={data.products.data[0].attributes.brand}
            />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase
              imageSrc={BACKEND_URL + data.products.data[0].attributes.image.data.attributes.url}
            />
            <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
      <div className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      ">
        {/* <DisplayMedium
          imageSrc={categories[0].image}
          subtitle={`${categories[0].itemCount} items`}
          title={titleIfy(categories[0].name)}
          link={`/category/${slugify(categories[0].name)}`}
        />
        <DisplayMedium
          imageSrc={categories[1].image}
          subtitle={`${categories[1].itemCount} items`}
          title={titleIfy(categories[1].name)}
          link={`/category/${slugify(categories[1].name)}`}
        /> */}
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the house.</p>
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between flex flex-wrap">
        {data.products.data.map(item =>
          <DisplaySmall
            imageSrc={BACKEND_URL + item.attributes.image.data.attributes.url}
            title={item.attributes.name}
            subtitle={item.attributes.price}
            link={`/product/${slugify(item.attributes.name)}`}
          />
        )}

        {/* <DisplaySmall
          imageSrc={inventory[0].image}
          title={inventory[0].name}
          subtitle={inventory[0].categories[0]}
          link={`/product/${slugify(inventory[0].name)}`}
        />

        <DisplaySmall
          imageSrc={inventory[1].image}
          title={inventory[1].name}
          subtitle={inventory[1].categories[0]}
          link={`/product/${slugify(inventory[1].name)}`}
        />

        <DisplaySmall
          imageSrc={inventory[2].image}
          title={inventory[2].name}
          subtitle={inventory[2].categories[0]}
          link={`/product/${slugify(inventory[2].name)}`}
        />

        <DisplaySmall
          imageSrc={inventory[3].image}
          title={inventory[3].name}
          subtitle={inventory[3].categories[0]}
          link={`/product/${slugify(inventory[3].name)}`}
        /> */}
      </div>
    </>
  )
}

// export async function getStaticProps() {
//   const inventory = await fetchInventory()

//   const inventoryCategorized = inventory.reduce((acc, next) => {
//     const categories = next.categories
//     categories.forEach(c => {
//       const index = acc.findIndex(item => item.name === c)
//       if (index !== -1) {
//         const item = acc[index]
//         item.itemCount = item.itemCount + 1
//         acc[index] = item
//       } else {
//         const item = {
//           name: c,
//           image: next.image,
//           itemCount: 1
//         }
//         acc.push(item)
//       }
//     })
//     return acc
//   }, [])

//   return {
//     props: {
//       inventoryData: inventory,
//       categories: inventoryCategorized
//     }
//   }
// }


// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: GET_ALL_PRODUCTS
//   });

//   return {
//     props: {
//       inventoryData: data.products.data
//     },
//   };
// }
export default Home