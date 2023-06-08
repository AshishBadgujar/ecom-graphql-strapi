import React, { useState } from 'react'
import Button from '../Button'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../utils/mutation'
import Alert from '../Alert'
import { useRouter } from "next/router";
import { useAuth } from '../../context/authContext'

export default function SignUp({ toggleFormState }) {
  const { setIsAuth } = useAuth()
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER)
  const router = useRouter();

  const [state, setState] = useState({
    username: '', email: '', password: ''
  })
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    await registerUser({
      variables: {
        input: state
      }
    })
  }
  if (data) {
    localStorage.setItem('jwt', data.register.jwt)
    setIsAuth(data.register.jwt)
    router.push('/')
  }
  return (
    <div>
      <h3 className="my-4">Sign Up</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          {
            error && <Alert text={error.message} />
          }
          <form className="bg-white shadow-md  px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                onChange={onChange} name="username"
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={onChange} name="email" type='email'
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Email address" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={onChange} name="password"
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
              <Button
                title="Sign Up"
                type="submit"
              />
              <a className="inline-block align-baseline font-bold text-sm" href="#" onClick={() => toggleFormState(true)}>
                Already signed up?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
