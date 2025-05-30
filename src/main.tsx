import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/custom.css'
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RKProvider = ReactKeycloakProvider as any;

createRoot(document.getElementById('root')!).render(
  <RKProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
    <StrictMode>
      <App />
    </StrictMode>
  </RKProvider>
)
