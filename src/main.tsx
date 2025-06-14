import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/custom.css'
import 'primeicons/primeicons.css'
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RKProvider = ReactKeycloakProvider as any;

const client = new ApolloClient({
  uri: 'https://rt-api.moontai0724.tw/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <RKProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
    <ApolloProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>
    </ApolloProvider>
  </RKProvider>
)
