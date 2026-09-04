import React from 'react'
import { router } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import {useAuth} from './features/auth/hooks/useAuth'
import { useEffect } from 'react'

const App = () => {
  const {handleGetMe} = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
