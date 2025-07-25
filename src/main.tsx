import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/custom.css'
import 'primeicons/primeicons.css'
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RKProvider = ReactKeycloakProvider as any;

loadDevMessages();
loadErrorMessages();

createRoot(document.getElementById('root')!).render(
  <RKProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
    <StrictMode>
      <App />
    </StrictMode>
  </RKProvider>
)
