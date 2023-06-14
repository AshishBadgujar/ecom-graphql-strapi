import Head from 'next/head'
import ListItem from '../../components/ListItem'
import { titleIfy, slugify } from '../../utils/helpers'
import fetchCategories from '../../utils/categoryProvider'
import inventoryForCategory from '../../utils/inventoryForCategory'
import CartLink from '../../components/CartLink'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT_BY_CATEGORY } from '../../utils/queries'
import { BACKEND_URL } from '../../apollo-client'

const Category = ({ cid }) => {
  const { data, loading } = useQuery(GET_PRODUCT_BY_CATEGORY, {
    variables: { categoryId: cid }
  })

  if (loading) return <h1>loading...</h1>
  const inventory = data.category.data.attributes.products.data
  const title = data.category.data.attributes.name
  return (
    <>
      <CartLink />
      <Head>
        <title>Jamstack ECommerce - {title}</title>
        <meta name="description" content={`Jamstack ECommerce - ${title}`} />
        <meta property="og:title" content={`Jamstack ECommerce - ${title}`} key="title" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      link={`/product/${item.id}`}
                      title={item.attributes.name}
                      price={item.attributes.price}
                      imageSrc={BACKEND_URL + item.attributes.image.data.attributes.url}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  let cid = params.cid;
  return {
    props: { cid }
  }
}


export default Category