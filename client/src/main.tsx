import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { Provider } from './utils/globalStorage'
import { store } from './store/store'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </Provider>
)
