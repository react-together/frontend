import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter, Route, Routes } from 'react-router'
import Gallery from './pages/Gallery'

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
