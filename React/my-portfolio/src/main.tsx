import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "./components/ui/provider" // Import the Chakra v3 Provider
import { AlertProvider } from "./context/alertContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 1. The Chakra Provider must be at the very top */}
    <Provider>
      {/* 2. Your custom AlertProvider goes inside */}
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </StrictMode>,
)