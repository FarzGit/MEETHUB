import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './redux/store.ts'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = import.meta.env.VITE_CLIENT_ID
console.log('the client is :',client)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={client}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)