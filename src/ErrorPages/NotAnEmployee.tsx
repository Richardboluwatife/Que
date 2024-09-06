import React from 'react'
import { signOutUser } from '../utils/firebase/firebase'



const NotAnEmployee: React.FC = () => {

  setTimeout(() => {

    signOutUser()

  }, 3000)
  return (
    <div className='h-screen flex justify-center items-center'>
        You don't exist as an employee in our database
        <br />
        <br />
        <span>You will be signed out in 3 seconds</span>
    </div>
  )
}

export default NotAnEmployee