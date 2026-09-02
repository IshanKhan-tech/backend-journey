import React from 'react'
import { router } from './app.routes'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
