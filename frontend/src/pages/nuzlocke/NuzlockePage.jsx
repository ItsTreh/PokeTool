import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarImg from '../../components/AvatarImg'

export default function NuzlockePage() {
  const navigate = useNavigate()
  const [adventures, setAdventures] = useState(() =>
    JSON.parse(sessionStorage.getItem('adventures') || '[]')
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-poke-yellow">💀 Nuzlocke Tracker</h1>
          <p className="text-white/50 mt-1">Tus aventuras Nuzlocke</p>
        </div>
        <button onClick={() => navigate('/nuzlocke/crear')} className="btn-primary">
          + Nueva Aventura
        </button>
      </div>

      {adventures.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-xl font-semibold text-white/70 mb-2">No tienes aventuras aún</h2>
          <p className="text-white/40 mb-6">
            Crea tu primera aventura Nuzlocke para empezar a registrar tu partida.
          </p>
          <button onClick={() => navigate('/nuzlocke/crear')} className="btn-primary mx-auto">
            Crear mi primera aventura
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adventures.map((adv) => (
            <button
              key={adv.id}
              onClick={() => navigate(`/nuzlocke/${adv.id}`, { state: { adventure: adv } })}
              className="card text-left hover:border-poke-yellow/40 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <AvatarImg avatar={adv.avatar} className="w-12 h-12" />
                <div>
                  <p className="font-bold text-white">{adv.trainerName}</p>
                  {adv.nuzlockeName && (
                    <p className="text-poke-yellow text-xs">{adv.nuzlockeName}</p>
                  )}
                  <p className="text-white/50 text-sm">{adv.gameName}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {adv.rules?.slice(0, 3).map((rule) => (
                  <span key={rule} className="bg-poke-bg text-white/60 text-xs px-2 py-0.5 rounded">
                    {rule.replace(/_/g, ' ')}
                  </span>
                ))}
                {adv.rules?.length > 3 && (
                  <span className="text-white/40 text-xs">+{adv.rules.length - 3} más</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
