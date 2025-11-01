import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'preline/dist/preline.js'
import { Provider } from 'react-redux'
import mainstore from './Store/Redux/MainStore.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={mainstore}>
      <App />
    </Provider>

  </StrictMode>,
)
