import { useState } from 'react'
import Head from 'next/head'
import Button from '../../components/Button'
import Image from '../../components/Image'
import QuantityPicker from '../../components/QuantityPicker'
import CartLink from '../../components/CartLink'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'
import { GET_PRODUCT } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import { BACKEND_URL } from '../../apollo-client'
import ReactMarkdown from 'react-markdown'
import { useCart } from 'react-use-cart'
import { toast } from 'react-toastify'

const ItemView = (props) => {
  const { addItem } = useCart()
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { id } = props
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
  })
  if (loading) return <h1>loading...</h1>
  if (data) console.log(data)
  if (error) console.log(error)

  const { name, price, description, image } = data.product.data.attributes

  function addItemToCart() {
    addItem({
      id,
      name,
      price,
      url: BACKEND_URL + image.data.attributes.url,
      quantity: numberOfitems
    })
    toast("Added to cart!");
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <CartLink />
      <Head>
        <title>Jamstack ECommerce - {name}</title>
        <meta name="data.product.data.attributes.description" content={description} />
        <meta property="og:title" content={`Jamstack ECommerce - ${name}`} key="title" />
      </Head>
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className="w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={BACKEND_URL + image.data.attributes.url} alt="Inventory item" className="max-h-full" />
          </div>
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>
          <h2 className="text-2xl tracking-wide sm:py-8 py-6">₹ {price}</h2>
          <p className="text-gray-600 leading-7">
            <ReactMarkdown>{description}</ReactMarkdown>
          </p>
          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
            />
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart()}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  let id = params.id;
  return {
    props: { id }
  }
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <ItemView {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext