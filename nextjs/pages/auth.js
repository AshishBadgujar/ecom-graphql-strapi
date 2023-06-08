import React, { useState } from 'react'
import SignUp from '../components/formComponents/SignUp'
import SignIn from '../components/formComponents/SignIn'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="flex flex-col">
      <div className="max-w-fw flex flex-col">
        <div className="pt-10">
          <h1 className="text-5xl font-light">Authentication</h1>
        </div>
        {isLogin ? <SignIn toggleFormState={setIsLogin} /> : <SignUp toggleFormState={setIsLogin} />}
      </div>
    </div>
  )
}

