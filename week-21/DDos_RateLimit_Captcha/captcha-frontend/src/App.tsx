import './App.css'
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react';

function App() {

  const [token, setToken] = useState('')

  return (
    <>
      <input placeholder='email' type='text' />
      <input placeholder='otp' type='text' />
      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAdDrKIiq0WUjGmg' />
      <button onClick={() => {
        axios.post('http://localhost:3000/reset-password', {
          email: 'chirag@gmail.com',
          otp: '123456',
          newPassword: 'newPassword',
          token: token
        })
      }}>Submit</button >
    </>
  )
}

export default App
