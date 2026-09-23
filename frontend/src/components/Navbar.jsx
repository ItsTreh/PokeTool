import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const linkClass = (path) =>
    `px-3 py-1 rounded-lg font-medium transition-colors ${
      location.pathname.startsWith(path)
        ? 'bg-poke-red text-white'
        : 'text-white/70 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-poke-secondary border-b border-white/10 h-16">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">⚪</span>
          <span className="text-poke-yellow font-bold text-xl tracking-wide">
            PokeTools
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/nuzlocke" className={linkClass('/nuzlocke')}>
            Nuzlocke
          </Link>
          <Link to="/shiny" className={linkClass('/shiny')}>
            Shiny Tracker
          </Link>
        </div>
      </div>
    </nav>
  )
}
