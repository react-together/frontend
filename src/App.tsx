import { BrowserRouter, Route, Routes } from 'react-router'
import Gallery from './pages/Gallery'
import { PrimeReactProvider } from 'primereact/api';
import { useKeycloak } from '@react-keycloak/web';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

function App() {
  const { keycloak } = useKeycloak();
  const value = {
    ripple: true,
  };

  const client = new ApolloClient({
    uri: 'https://rt-api.moontai0724.tw/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });

  return (
    <ApolloProvider client={client}>
      <PrimeReactProvider value={value}>
        <BrowserRouter basename='/frontend'>
          <Routes>
            <Route path="/" element={keycloak.authenticated ? <Gallery /> : <div>驗證登入中……</div>} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </ApolloProvider>
  )
}

export default App
