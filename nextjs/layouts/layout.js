import Link from 'next/link'
import { slugify } from '../utils/helpers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { navItemLength } from '../ecommerce.config'

export default function Layout({ children, categories }) {
  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }
  return (
    <div>
      <nav>
        <div >
          <div className="
          md:flex 
          sm:flex-col px-12 pt-8 pb-6 
          ">
            <div className="mr-4 sm:mr-2 max-w-48 sm:max-w-none">
              <Link href="/">
                <a aria-label="Home">
                  <img src="/logo.png" alt="logo" width="90" height="28" />
                </a>
              </Link>
            </div>
            <div className="flex flex-wrap mt-1">
              <Link href="/">
                <a aria-label="Home">
                  <p className="
                    sm:mr-8 text-left text-smaller mr-4
                  ">
                    Home
                  </p>
                </a>
              </Link>
              {
                categories.map((category, index) => (
                  <Link
                    href={`/category/${slugify(category)}`}
                    key={index}
                  >
                    <a aria-label={category}>
                      <p className="
                          sm:mr-8 text-left text-smaller mr-4
                        ">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </p>
                    </a>
                  </Link>
                ))
              }
              <Link href="/categories">
                <a aria-label="All categories">
                  <p className="
                    sm:mr-8 text-left text-smaller mr-4 
                  ">
                    All
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="sm:px-10 px-12 pb-10 flex justify-center">
        <main className="w-full">{children}</main>
      </div>
      <footer className="flex">
        <div className="
        flex justify-between w-full px-12 py-8
        items-center
        desktop:px-0
        border-solid
        border-t border-gray-300">
          <span className="block text-gray-700 text-xs">Copyright © 2021 JAMstack Ecommerce. All rights reserved.</span>
          <div className="
            flex flex-1
            justify-end sm:m-0
          ">
            <Link href="/admin">
              <a aria-label="Admin panel">
                <p className="text-sm font-semibold">Admins</p>
              </a>
            </Link>
          </div>
        </div>
      </footer>
      <ToastContainer autoClose={3000} />
    </div>
  )
}