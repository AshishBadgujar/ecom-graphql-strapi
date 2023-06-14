import Link from 'next/link'
import { slugify } from '../utils/helpers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { navItemLength } from '../ecommerce.config'
import { useAuth } from '../context/authContext'
import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from '../utils/queries'
import { useState } from 'react'
import CommandPalette from '../components/CommandPalette'

export default function Layout({ children }) {
  const { isAuth, logout } = useAuth()
  const { data, loading } = useQuery(GET_ALL_CATEGORIES)
  const [isOpen, setIsOpen] = useState(false);
  if (loading) return ''

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      {isOpen && <CommandPalette togglePalette={togglePalette} />}
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

              {
                data.categories.data.map((category, index) => (
                  <Link
                    href={`/category/${(category.id)}`}
                    key={index}
                  >
                    <a aria-label={category.attributes.name}>
                      <p className="
                          sm:mr-8 text-left text-smaller mr-4
                        ">
                        {category.attributes.name.charAt(0).toUpperCase() + category.attributes.name.slice(1)}
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
            <div className="mr-4 sm:mr-2 max-w-48 sm:max-w-none cursor-pointer" onClick={togglePalette}>
              <a aria-label="Home" className='text-gray-300'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
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
            {isAuth ?
              <Link href="/">
                <a aria-label="Admin panel">
                  <p className="text-sm font-semibold" onClick={logout}>Logout</p>
                </a>
              </Link>
              :
              <Link href="/auth">
                <a aria-label="Admin panel">
                  <p className="text-sm font-semibold">Login</p>
                </a>
              </Link>
            }
          </div>
        </div>
      </footer>
      <ToastContainer autoClose={3000} position="bottom-left"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  )
}