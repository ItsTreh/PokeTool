import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGames, validateAdventure } from '../../api/pokemonApi'
import LoadingSpinner from '../../components/LoadingSpinner'
import AvatarImg from '../../components/AvatarImg'

const AVATARS = [
  { name: 'Ash', color: '#3B82F6', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/red.png' },
  { name: 'Misty', color: '#EF4444', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/misty.png' },
  { name: 'Brock', color: '#92400E', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/brock.png' },
  { name: 'May', color: '#EC4899', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/may.png' },
  { name: 'Dawn', color: '#8B5CF6', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/dawn.png' },
  { name: 'Iris', color: '#7C3AED', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/iris.png' },
  { name: 'Serena', color: '#F43F5E', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/serena.png' },
  { name: 'Lillie', color: '#6EE7B7', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/lillie.png' },
  { name: 'Gloria', color: '#F59E0B', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/gloria.png' },
  { name: 'Nemona', color: '#84CC16', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/nemona.png' },
  { name: 'Penny', color: '#FB7185', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/penny.png' },
  { name: 'Liko', color: '#F97316', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/liko.png' },
]

const RULES = [
  { id: 'DUPES_CLAUSE', label: 'Dupes Clause' },
  { id: 'SPECIES_CLAUSE', label: 'Species Clause' },
  { id: 'SHINY_CLAUSE', label: 'Shiny Clause' },
  { id: 'SET_MODE', label: 'Modo Set' },
  { id: 'NO_ITEMS_IN_BATTLE', label: 'Sin Objetos en Batalla' },
  { id: 'LEVEL_CAP', label: 'Límite de Nivel' },
  { id: 'NO_LEGENDARY_RULE', label: 'Sin Legendarios' },
  { id: 'BLIND_NUZLOCKE', label: 'Nuzlocke Ciego' },
  { id: 'NO_OVERLEVELING', label: 'Sin Sobreentrenar' },
  { id: 'PERMADEATH_TOTAL', label: 'Muerte Permanente Total' },
  { id: 'CLASSIC_NUZLOCKE', label: 'Nuzlocke Clásico' },
  { id: 'HARDCORE_NUZLOCKE', label: 'Nuzlocke Hardcore' },
  { id: 'RANDOMIZER_NUZLOCKE', label: 'Nuzlocke Aleatorio' },
  { id: 'SOUL_LINK', label: 'Soul Link' },
  { id: 'WEDLOCKE', label: 'Wedlocke' },
  { id: 'MONOLOCKE', label: 'Monolocke' },
]

export default function CreateAdventurePage() {
  const navigate = useNavigate()

  const [trainerName, setTrainerName] = useState('')
  const [nuzlockeName, setNuzlockeName] = useState('')
  const [selectedGame, setSelectedGame] = useState('')
  const [selectedRules, setSelectedRules] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [games, setGames] = useState([])
  const [gamesLoading, setGamesLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames()
        setGames(data)
        if (data.length > 0) setSelectedGame(data[0].id)
      } catch {
        setError('No se pudieron cargar los juegos disponibles')
      } finally {
        setGamesLoading(false)
      }
    }
    fetchGames()
  }, [])

  function toggleRule(ruleId) {
    setSelectedRules((prev) =>
      prev.includes(ruleId) ? prev.filter((r) => r !== ruleId) : [...prev, ruleId]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const knownRules = ['DUPES_CLAUSE', 'SPECIES_CLAUSE', 'SHINY_CLAUSE', 'SET_MODE', 'NO_ITEMS_IN_BATTLE']
    const backendRules = selectedRules.filter((r) => knownRules.includes(r))

    try {
      await validateAdventure({ trainerName, game: selectedGame, rules: backendRules })

      const newAdventure = {
        id: Date.now().toString(),
        trainerName,
        nuzlockeName,
        game: selectedGame,
        gameName: games.find((g) => g.id === selectedGame)?.displayName || selectedGame,
        rules: selectedRules,
        avatar: AVATARS[selectedAvatar],
        routes: [],
      }

      const existing = JSON.parse(sessionStorage.getItem('adventures') || '[]')
      sessionStorage.setItem('adventures', JSON.stringify([...existing, newAdventure]))
      navigate('/nuzlocke')
    } catch (err) {
      setError(err.response?.data || 'Error al crear la aventura. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/nuzlocke')}
        className="text-white/50 hover:text-white mb-6 flex items-center gap-1 transition-colors"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold text-poke-yellow mb-8">Nueva Aventura</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-4">
          <h2 className="section-title">Datos del entrenador</h2>

          <div>
            <label className="block text-sm text-white/70 mb-1">Nombre del entrenador *</label>
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              placeholder="Ash, Red, Serena..."
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Nombre del Nuzlocke</label>
            <input
              type="text"
              value={nuzlockeName}
              onChange={(e) => setNuzlockeName(e.target.value)}
              placeholder="Mi primera aventura, La caída de Kanto..."
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Juego *</label>
            {gamesLoading ? (
              <LoadingSpinner size="sm" text="Cargando juegos..." />
            ) : (
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                required
                className="input-field"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>{g.displayName}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Personaje del entrenador</h2>
          <div className="grid grid-cols-4 gap-3">
            {AVATARS.map((avatar, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAvatar(idx)}
                className={`rounded-xl p-2 border-2 transition-all hover:scale-105 flex flex-col items-center gap-1 ${
                  selectedAvatar === idx
                    ? 'border-poke-yellow bg-poke-yellow/10'
                    : 'border-white/20 hover:border-white/50'
                }`}
              >
                <AvatarImg avatar={avatar} className="w-14 h-14" />
                <span className="text-xs text-white/70 truncate w-full text-center">{avatar.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Reglas de la partida</h2>
          <div className="grid grid-cols-2 gap-2">
            {RULES.map((rule) => (
              <label
                key={rule.id}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedRules.includes(rule.id)}
                  onChange={() => toggleRule(rule.id)}
                  className="w-4 h-4 accent-poke-yellow"
                />
                <span className="text-sm text-white/80">{rule.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-poke-red/20 border border-poke-red/50 rounded-lg px-4 py-3 text-poke-red text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || gamesLoading}
          className="btn-primary w-full py-3 text-lg"
        >
          {submitting ? 'Creando...' : 'Crear Aventura'}
        </button>
      </form>
    </div>
  )
}
