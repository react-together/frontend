import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter, Route, Routes } from 'react-router'
import Gallery from './pages/Gallery'

function App() {
  const value = {
    ripple: true,
  };

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
