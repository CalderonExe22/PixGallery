import { useEffect } from 'react'
import { useState } from 'react'
import api from '../api/api'

export default function Home() {

  const [username, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(()=>{
    const checkLoggedInUser = async () =>{
      try{
        const token = localStorage.getItem('accessToken')
        if(token) {
          const response = await api.get('user/')
          setIsLoggedIn(true)
          setUserName(response.data.username)
        }else{
          setIsLoggedIn(false)
          setUserName('')
        }
      }catch(error){
        setIsLoggedIn(false)
        setUserName('')
        console.log(error)
      }
    }
    checkLoggedInUser()
  },[])

  const handleLogout = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if(refreshToken && accessToken){
        const config = {
          headers : {
            'Authorization' : `Bearer ${accessToken}`
          }
        }
        await api.post('logout/', { refresh: refreshToken }, config);
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
        setUserName('')
      }
    }catch(error){
      console.log('failed logout',error)
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
        <h1>Hola, {username}. Gracias por logearte</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
      ):(
        <h1>Hola, logeate primero</h1>
      )}
    </div>
  )
}
