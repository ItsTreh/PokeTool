import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-poke-yellow mb-3 tracking-tight">
          PokeTools
        </h1>
        <p className="text-white/60 text-xl">
          Herramientas para jugadores de Pokémon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => navigate('/nuzlocke')}
          className="group bg-poke-secondary hover:bg-poke-card border border-white/10 hover:border-poke-red/60 rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-poke-red/20"
        >
          <div className="text-5xl mb-4">💀</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Nuzlocke Tracker
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Registra tus aventuras Nuzlocke. Captura pokémon por ruta, lleva el
            registro de bajas y sigue tus reglas personalizadas.
          </p>
          <div className="mt-4 flex items-center gap-1 text-poke-red font-semibold text-sm group-hover:gap-2 transition-all">
            Empezar <span>→</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/shiny')}
          className="group bg-poke-secondary hover:bg-poke-card border border-white/10 hover:border-poke-yellow/60 rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-poke-yellow/20"
        >
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Shiny Tracker
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Cuenta tus encuentros y calcula la probabilidad acumulada de
            encontrar un pokémon shiny según tu generación y método.
          </p>
          <div className="mt-4 flex items-center gap-1 text-poke-yellow font-semibold text-sm group-hover:gap-2 transition-all">
            Empezar <span>→</span>
          </div>
        </button>
      </div>
    </div>
  )
}
