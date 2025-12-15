import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cats from './pages/Cats'
import Crypto from './pages/Crypto'
import News from './pages/News'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cats" element={<Cats />} />
        <Route path="crypto" element={<Crypto />} />
        <Route path="news" element={<News />} />
      </Route>
    </Routes>
  )
}

export default App