import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HackathonProvider } from './context/hackathonContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HackathonProvider>   {/* this is the provider that we are using to wrap the app component so that we can access the userAuth and queue in the app component and the signIn component  */}
    <App />
    </HackathonProvider>
  </StrictMode>,
)
