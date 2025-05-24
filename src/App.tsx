import { BrowserRouter, Route, Routes } from 'react-router'
import Gallery from './pages/Gallery'
import { PrimeReactProvider } from 'primereact/api';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak } = useKeycloak();
  const value = {
    ripple: true,
  };

  return (
    <PrimeReactProvider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={keycloak.authenticated ? <Gallery /> : <div>驗證登入中……</div>} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
