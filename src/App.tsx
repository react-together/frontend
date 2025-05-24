import { useState, useEffect } from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter, Route, Routes } from 'react-router'
import Gallery from './pages/Gallery'
import keycloak from './keycloak'

function App() {
  const value = {
    ripple: true,
  };
  const [authenticated, setAuthenticated] = useState(false);

   useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(auth => {
      setAuthenticated(auth);
    });
  }, []);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <PrimeReactProvider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
