import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { searchPokemon, searchMove, searchItem } from '../../api/pokemonApi'
import TypeBadge from '../../components/TypeBadge'
import LoadingSpinner from '../../components/LoadingSpinner'
import AutocompleteSearch from '../../components/AutocompleteSearch'
import AvatarImg from '../../components/AvatarImg'

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Macho ♂' },
  { value: 'FEMALE', label: 'Hembra ♀' },
  { value: 'UNKNOWN', label: 'Sin género' },
]

const STATUS_OPTIONS = [
  { value: 'team', label: 'En equipo', emoji: '⚔️', color: 'text-green-400', border: 'border-green-500/50', bg: 'bg-green-500/10' },
  { value: 'box', label: 'En cajas', emoji: '📦', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' },
  { value: 'dead', label: 'Muerto', emoji: '💀', color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/10' },
  { value: 'released', label: 'Liberado', emoji: '🌟', color: 'text-yellow-400', border: 'border-yellow-500/50', bg: 'bg-yellow-500/10' },
]

function getStatus(value) {
  return STATUS_OPTIONS.find(s => s.value === value) ?? STATUS_OPTIONS[0]
}

// ─── Modal para añadir Pokemon ────────────────────────────────────────────────

function AddPokemonModal({ onAdd, onClose }) {
  const [routeName, setRouteName] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [nickname, setNickname] = useState('')
  const [isShiny, setIsShiny] = useState(false)
  const [gender, setGender] = useState('UNKNOWN')
  const [level, setLevel] = useState(5)
  const [notes, setNotes] = useState('')
  const [moves, setMoves] = useState([null, null, null, null])
  const [item, setItem] = useState(null)

  function handleMoveResult(idx, data) {
    setMoves(prev => {
      const next = [...prev]
      next[idx] = data
      return next
    })
  }

  function handleAdd() {
    if (!pokemon) return
    const spriteUrl = isShiny
      ? pokemon.spriteUrl?.replace('front_default', 'front_shiny')
      : pokemon.spriteUrl

    onAdd({
      id: Date.now().toString(),
      routeName,
      name: pokemon.name,
      spriteUrl,
      types: pokemon.types,
      nickname: nickname || pokemon.name,
      isShiny,
      gender,
      level,
      moves: moves.filter(Boolean),
      item: item || null,
      notes,
      status: 'team',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-poke-secondary rounded-2xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-poke-yellow">Añadir Pokémon</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Nombre de la ruta</label>
          <input type="text" value={routeName} onChange={(e) => setRouteName(e.target.value)}
            placeholder="Ruta 1, Ciudad Azalea..." className="input-field" />
        </div>

        <div>
          <AutocompleteSearch
            type="pokemon"
            apiFn={searchPokemon}
            onResult={setPokemon}
            label="Pokémon"
            placeholder="Escribe para buscar... (ej: pika, char)"
          />
          {pokemon && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-poke-bg rounded-lg">
              <img
                src={isShiny ? pokemon.spriteUrl?.replace('front_default', 'front_shiny') : pokemon.spriteUrl}
                alt={pokemon.name} className="w-12 h-12" style={{ imageRendering: 'pixelated' }}
              />
              <div>
                <p className="font-semibold capitalize text-sm">{pokemon.name}</p>
                <div className="flex gap-1">
                  {pokemon.types?.map((t) => <TypeBadge key={t} type={t} />)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-white/70 mb-1">Mote (apodo)</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
              placeholder="Dejar vacío = nombre" className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Nivel</label>
            <input type="number" value={level} min={1} max={100}
              onChange={(e) => setLevel(Number(e.target.value))} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-white/70 mb-1">Género</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
              {GENDER_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isShiny} onChange={(e) => setIsShiny(e.target.checked)}
                className="w-4 h-4 accent-poke-yellow" />
              <span className="text-white/80 text-sm">✨ Es shiny</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-2">Movimientos (hasta 4)</label>
          <div className="space-y-2">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx}>
                <AutocompleteSearch
                  type="move"
                  apiFn={searchMove}
                  onResult={(data) => handleMoveResult(idx, data)}
                  placeholder={`Movimiento ${idx + 1}...`}
                />
                {moves[idx] && (
                  <p className="text-xs text-white/50 mt-0.5 pl-1 capitalize">
                    {moves[idx].name} — {moves[idx].type} — {moves[idx].pp} PP
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <AutocompleteSearch
          type="item"
          apiFn={searchItem}
          onResult={setItem}
          label="Objeto equipado"
          placeholder="Escribe para buscar objeto..."
        />
        {item && <p className="text-xs text-white/50 -mt-2 pl-1 capitalize">{item.name}</p>}

        <div>
          <label className="block text-sm text-white/70 mb-1">Notas</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Notas breves sobre este pokemon..."
            rows={2} className="input-field resize-none" />
        </div>

        <button onClick={handleAdd} disabled={!pokemon} className="btn-primary w-full disabled:opacity-40">
          Añadir Pokémon
        </button>
      </div>
    </div>
  )
}

// ─── Modal para editar Pokemon (estado, apodo, nivel, notas) ─────────────────

function EditPokemonModal({ pokemon, onSave, onClose }) {
  const [status, setStatus] = useState(pokemon.status ?? 'team')
  const [nickname, setNickname] = useState(pokemon.nickname || '')
  const [level, setLevel] = useState(pokemon.level ?? 5)
  const [notes, setNotes] = useState(pokemon.notes || '')

  function handleSave() {
    onSave({ ...pokemon, status, nickname, level, notes })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-poke-secondary rounded-2xl border border-white/10 w-full max-w-sm p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-poke-yellow">Editar Pokémon</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* cabecera del pokemon */}
        <div className="flex items-center gap-3 p-3 bg-poke-bg rounded-lg">
          <img src={pokemon.spriteUrl} alt={pokemon.name}
            className="w-14 h-14" style={{ imageRendering: 'pixelated' }} />
          <div>
            <p className="font-semibold capitalize text-white">
              {pokemon.nickname || pokemon.name} {pokemon.isShiny && '✨'}
            </p>
            <p className="text-white/40 text-xs capitalize">{pokemon.name}</p>
            <div className="flex gap-1 mt-0.5">
              {pokemon.types?.map((t) => <TypeBadge key={t} type={t} />)}
            </div>
          </div>
        </div>

        {/* selector de estado */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Estado</label>
          <div className="grid grid-cols-2 gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  status === s.value
                    ? `${s.border} ${s.bg} ${s.color}`
                    : 'border-white/10 text-white/50 hover:border-white/30'
                }`}
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Apodo</label>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
            className="input-field" placeholder={pokemon.name} />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Nivel</label>
          <input type="number" value={level} min={1} max={100}
            onChange={(e) => setLevel(Number(e.target.value))} className="input-field" />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Notas</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            rows={2} className="input-field resize-none" placeholder="Notas..." />
        </div>

        <button onClick={handleSave} className="btn-primary w-full">Guardar cambios</button>
      </div>
    </div>
  )
}

// ─── Tarjeta de Pokemon capturado ─────────────────────────────────────────────

function PokemonCard({ pokemon, onClick }) {
  const status = getStatus(pokemon.status)
  const isDead = pokemon.status === 'dead'
  const isReleased = pokemon.status === 'released'

  return (
    <button
      onClick={() => onClick(pokemon)}
      className={`card text-left transition-all hover:scale-105 border-2 ${status.border} ${
        isDead ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="relative">
          <img
            src={pokemon.spriteUrl}
            alt={pokemon.name}
            className={`w-14 h-14 ${isDead ? 'grayscale' : ''}`}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-white capitalize truncate">
            {pokemon.nickname || pokemon.name} {pokemon.isShiny && '✨'}
          </p>
          <p className="text-white/40 text-xs">Lv. {pokemon.level}</p>
          {pokemon.routeName && (
            <p className="text-white/30 text-xs truncate">{pokemon.routeName}</p>
          )}
        </div>
      </div>

      <div className="flex gap-1 flex-wrap mb-2">
        {pokemon.types?.map((t) => <TypeBadge key={t} type={t} />)}
      </div>

      <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
        <span>{status.emoji}</span>
        <span>{status.label}</span>
      </div>

      {pokemon.moves?.length > 0 && (
        <div className="text-xs text-white/30 space-y-0.5 mt-2">
          {pokemon.moves.map((m) => (
            <p key={m.name} className="capitalize">• {m.name}</p>
          ))}
        </div>
      )}
    </button>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdventureDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [adventure] = useState(() => {
    if (location.state?.adventure) return location.state.adventure
    const stored = JSON.parse(sessionStorage.getItem('adventures') || '[]')
    return stored.find((a) => a.id === id) || null
  })

  const [capturedPokemon, setCapturedPokemon] = useState(() =>
    JSON.parse(sessionStorage.getItem(`pokemon_${id}`) || '[]')
  )
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPokemon, setEditingPokemon] = useState(null)

  useEffect(() => {
    if (adventure) {
      sessionStorage.setItem(`pokemon_${id}`, JSON.stringify(capturedPokemon))
    }
  }, [capturedPokemon, id, adventure])

  function handleAddPokemon(pokemon) {
    setCapturedPokemon((prev) => [...prev, pokemon])
  }

  function handleSaveEdit(updated) {
    setCapturedPokemon((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }

  if (!adventure) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-white/50">Aventura no encontrada.</p>
        <button onClick={() => navigate('/nuzlocke')} className="btn-secondary mt-4">Volver</button>
      </div>
    )
  }

  const byStatus = (v) => capturedPokemon.filter(p => (p.status ?? 'team') === v)
  const teamCount = byStatus('team').length
  const deadCount = byStatus('dead').length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/nuzlocke')}
        className="text-white/50 hover:text-white mb-6 flex items-center gap-1 transition-colors">
        ← Volver
      </button>

      {/* cabecera */}
      <div className="card mb-6">
        <div className="flex items-start gap-4">
          <AvatarImg avatar={adventure.avatar} className="w-16 h-16" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{adventure.trainerName}</h1>
            {adventure.nuzlockeName && (
              <p className="text-poke-yellow font-medium">{adventure.nuzlockeName}</p>
            )}
            <p className="text-white/50 text-sm">{adventure.gameName || adventure.game}</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-green-400">⚔️ {teamCount} en equipo</p>
            {deadCount > 0 && <p className="text-red-400">💀 {deadCount} muertos</p>}
          </div>
        </div>

        {adventure.rules?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {adventure.rules.map((rule) => (
              <span key={rule} className="bg-poke-bg border border-white/10 text-white/60 text-xs px-2 py-1 rounded-lg">
                {rule.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* lista de pokemon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">
          Pokémon Capturados ({capturedPokemon.length})
        </h2>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          + Añadir Pokémon
        </button>
      </div>

      {capturedPokemon.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">🎣</div>
          <p className="text-white/50">Aún no has capturado ningún pokémon.</p>
          <p className="text-white/30 text-sm mt-1">Pulsa "Añadir Pokémon" para empezar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {capturedPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} onClick={setEditingPokemon} />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddPokemonModal
          onAdd={handleAddPokemon}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingPokemon && (
        <EditPokemonModal
          pokemon={editingPokemon}
          onSave={handleSaveEdit}
          onClose={() => setEditingPokemon(null)}
        />
      )}
    </div>
  )
}
