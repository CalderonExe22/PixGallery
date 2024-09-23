import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import api from '../api/api'

export default function Layout() {

  const [menus, setMenus] = useState([])

  useEffect(()=>{
    const checkMenuUser = async () =>{
      try {
        const token = localStorage.getItem('accessToken')
        if(token){
          const response = await api.get('menu/authenticated-menu/')
          setMenus(response.data)
        }else{
          const response = await api.get('menu/public-menu/')
          setMenus(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkMenuUser()
  },[])

  return (
    <>
        <nav className='flex justify-center'>
            <ul className='flex gap-9'>
              {menus.map((menu)=>(
                <li key={menu.name}><Link to={menu.url}>{menu.name}</Link></li>
              ))}
            </ul>
        </nav>
        <Outlet />
    </>
  )
}
