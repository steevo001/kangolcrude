import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import SkillBarter from './pages/SkillBarter'
import OAUBrain from './pages/OAUBrain'
import SpaceGrid from './pages/SpaceGrid'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barter" element={<SkillBarter />} />
        <Route path="/brain" element={<OAUBrain />} />
        <Route path="/grid" element={<SpaceGrid />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
