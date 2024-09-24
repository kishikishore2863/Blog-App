import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store,persistor } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import {PersistGate} from 'redux-persist/integration/react'
import ThemeProvider from './component/ThemeProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Provider>
    </PersistGate>
  </StrictMode>
)
