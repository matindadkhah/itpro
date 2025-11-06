import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'preline/dist/preline.js'
import { Provider } from 'react-redux'
import mainstore from './Store/Redux/MainStore.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // استایل پیش‌فرض Toast



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={mainstore}>
      <App />
      <ToastContainer  />
    </Provider>

  </StrictMode>,
)
