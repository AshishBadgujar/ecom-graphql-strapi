import Head from 'next/head'
import { titleIfy, slugify } from '../utils/helpers'
import { DisplayMedium } from '../components'
import CartLink from '../components/CartLink'
import { fetchInventory } from '../utils/inventoryProvider'
import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from '../utils/queries'
import Link from 'next/link'

function Categories() {
  const { data, loading } = useQuery(GET_ALL_CATEGORIES)
  if (loading) return <h1>loading...</h1>
  return (
    <>
      <div className="w-full">
        <CartLink />
        <Head>
          <title>Jamstack ECommerce - All Categories</title>
          <meta name="description" content={`Jamstack ECommerce - All categories`} />
          <meta property="og:title" content="Jamstack ECommerce - All Categories" key="title" />
        </Head>
        <div className="
          pt-4 sm:pt-10 pb-8
        ">
          <h1 className="text-5xl font-light">All categories</h1>
        </div>
        <div className="grid gap-4
          lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {
            data.categories.data.map((category, index) => (
              <div key={index} className="
                    mb-4 lg:mb-0
                    bg-light p-8 pb-0 hover:bg-light-200">
                <Link href={`/category/${category.id}`}>
                  <a aria-label={titleIfy(category.attributes.name)}>
                    <div className="mb-8">
                      <p className="text-3xl text-center font-semibold mb-1">{titleIfy(category.attributes.name)}</p>
                    </div>
                  </a>
                </Link>
              </div>

            ))
          }
        </div>
      </div>
    </>
  )
}

export default Categories