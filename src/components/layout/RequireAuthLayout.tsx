"use client"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authStateType } from '@/redux/reducers/auth/initialstate';
import MyCookies from '@/hooks/MyCookies';
import Loader from '@/components/Loader';

export default function RequireAuthLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [didMounted, setDidMount] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const myCookies = MyCookies();

  const authState: authStateType = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (!didMounted) {
      const cookies: string | undefined = myCookies.getToken();
      if (cookies !== undefined) {
        setIsAuth(true);
        setDidMount(true);
      } else {
        window.location.replace('auth/login')
        setIsAuth(false);
        setDidMount(true);
      }
    }
  }, [didMounted]);

  useEffect(() => {
    const cookies: string | undefined = myCookies.getToken();
    if (cookies == undefined && authState.token == null) {
      setIsAuth(false)
      window.location.replace('auth/login')
    }
  }, [authState])

  return (

    !didMounted ? <Loader /> :
      <>
        {
          isAuth ?
            <>
              {children}
            </>
            : <Loader />
        }
      </>
  )


}
