import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NuzlockePage from './pages/nuzlocke/NuzlockePage'
import CreateAdventurePage from './pages/nuzlocke/CreateAdventurePage'
import AdventureDetailPage from './pages/nuzlocke/AdventureDetailPage'
import ShinyTrackerPage from './pages/shiny/ShinyTrackerPage'

export default function App() {
  return (
    <div className="min-h-screen bg-poke-bg font-inter">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuzlocke" element={<NuzlockePage />} />
          <Route path="/nuzlocke/crear" element={<CreateAdventurePage />} />
          <Route path="/nuzlocke/:id" element={<AdventureDetailPage />} />
          <Route path="/shiny" element={<ShinyTrackerPage />} />
        </Routes>
      </main>
    </div>
  )
}
