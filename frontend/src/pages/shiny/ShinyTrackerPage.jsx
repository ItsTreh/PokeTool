import { useState, useEffect } from 'react'
import { calculateShiny, getShinyPokemon } from '../../api/shinyApi'
import AutocompleteSearch from '../../components/AutocompleteSearch'

const GENERATIONS = [
  { value: 'GEN_1', label: 'Generación 1' },
  { value: 'GEN_2', label: 'Generación 2' },
  { value: 'GEN_3', label: 'Generación 3' },
  { value: 'GEN_4', label: 'Generación 4' },
  { value: 'GEN_5', label: 'Generación 5' },
  { value: 'GEN_6', label: 'Generación 6' },
  { value: 'GEN_7', label: 'Generación 7' },
  { value: 'GEN_8', label: 'Generación 8' },
  { value: 'GEN_9', label: 'Generación 9' },
]

export default function ShinyTrackerPage() {
  const [generation, setGeneration] = useState('GEN_6')
  const [shinyCharm, setShinyCharm] = useState(false)
  const [targetPokemon, setTargetPokemon] = useState(null)
  const [pokemonError, setPokemonError] = useState(null)

  const [sessionActive, setSessionActive] = useState(false)
  const [encounters, setEncounters] = useState(0)
  const [result, setResult] = useState(null)
  const [calcLoading, setCalcLoading] = useState(false)
  const [calcError, setCalcError] = useState(null)

  useEffect(() => {
    if (!sessionActive) return
    const fetchCalc = async () => {
      setCalcLoading(true)
      setCalcError(null)
      try {
        const data = await calculateShiny({ generationName: generation, shinyCharm, encounters })
        setResult(data)
      } catch {
        setCalcError('Error al calcular la probabilidad')
      } finally {
        setCalcLoading(false)
      }
    }
    fetchCalc()
  }, [encounters, sessionActive])

  function startSession() {
    setEncounters(0)
    setResult(null)
    setSessionActive(true)
  }

  function resetSession() {
    setEncounters(0)
    setResult(null)
  }

  const probability = result?.probability ?? 0
  const progressPercent = Math.min(probability * 100, 100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-poke-yellow mb-2">✨ Shiny Tracker</h1>
      <p className="text-white/50 mb-8">Calcula la probabilidad acumulada de encontrar un pokémon shiny.</p>

      <div className="card mb-6 space-y-4">
        <h2 className="section-title">Configuración de sesión</h2>

        <div>
          <label className="block text-sm text-white/70 mb-1">Generación</label>
          <select
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
            disabled={sessionActive}
            className="input-field"
          >
            {GENERATIONS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="shinyCharm"
            checked={shinyCharm}
            onChange={(e) => setShinyCharm(e.target.checked)}
            disabled={sessionActive}
            className="w-4 h-4 accent-poke-yellow"
          />
          <label htmlFor="shinyCharm" className="text-white/80 cursor-pointer select-none">
            Tengo el Shiny Charm
          </label>
        </div>

        <div>
          <AutocompleteSearch
            type="pokemon"
            apiFn={getShinyPokemon}
            onResult={(data) => { setTargetPokemon(data); setPokemonError(null) }}
            onError={(err) => {
              setTargetPokemon(null)
              setPokemonError(err.response?.status === 404 ? 'Pokémon no encontrado' : 'Error al buscar')
            }}
            label="Pokémon objetivo"
            placeholder="Escribe para buscar... (ej: ralts, umbre)"
            disabled={sessionActive}
          />
          {pokemonError && <p className="text-poke-red text-sm mt-1">{pokemonError}</p>}
          {targetPokemon && (
            <div className="flex items-center gap-3 mt-2 p-2 bg-poke-bg rounded-lg border border-white/10">
              <img
                src={targetPokemon.spriteUrl}
                alt={targetPokemon.name}
                className="w-14 h-14"
                style={{ imageRendering: 'pixelated' }}
              />
              <div>
                <p className="font-semibold capitalize text-white">{targetPokemon.name}</p>
                <p className="text-white/50 text-sm capitalize">{targetPokemon.types?.join(', ')}</p>
              </div>
            </div>
          )}
        </div>

        {!sessionActive && (
          <button onClick={startSession} className="btn-primary w-full">
            Iniciar Sesión
          </button>
        )}
      </div>

      {sessionActive && (
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0">Contador de encuentros</h2>
            <button onClick={resetSession} className="text-white/40 hover:text-white/80 text-sm transition-colors">
              Reiniciar
            </button>
          </div>

          <div className="text-center">
            <div className="text-8xl font-extrabold text-white tabular-nums">{encounters}</div>
            <p className="text-white/40 mt-1">encuentros</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setEncounters((p) => Math.max(0, p - 1))}
              disabled={encounters === 0}
              className="flex-1 bg-poke-secondary hover:bg-poke-card border border-white/20 text-white font-bold text-2xl py-4 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              −1
            </button>
            <button
              onClick={() => setEncounters((p) => p + 1)}
              className="flex-1 bg-poke-red hover:bg-red-600 text-white font-bold text-2xl py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              +1
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Probabilidad acumulada</span>
              <span className="text-poke-yellow font-bold">
                {calcLoading ? '...' : `${progressPercent.toFixed(4)}%`}
              </span>
            </div>

            <div className="h-3 bg-poke-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-poke-red to-poke-yellow rounded-full progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {result && (
              <div className="flex justify-between text-xs text-white/40 pt-1">
                <span>Odds base: 1/{result.baseOdds}</span>
                <span>Rolls por encuentro: {result.rolls}</span>
              </div>
            )}

            {calcError && <p className="text-poke-red text-sm">{calcError}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
