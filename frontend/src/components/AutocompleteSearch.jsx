import { useState, useEffect, useRef } from 'react'

const nameCache = {}

async function fetchNames(type) {
  if (nameCache[type]) return nameCache[type]
  const limits = { pokemon: 1302, item: 2060, move: 937 }
  const res = await fetch(`https://pokeapi.co/api/v2/${type}?limit=${limits[type]}`)
  const data = await res.json()
  nameCache[type] = data.results.map(r => r.name)
  return nameCache[type]
}

export default function AutocompleteSearch({
  type,
  apiFn,
  onResult,
  onError,
  placeholder,
  label,
  disabled = false,
}) {
  const [query, setQuery] = useState('')
  const [allNames, setAllNames] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchNames(type).then(setAllNames).catch(() => {})
  }, [type])

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const q = query.toLowerCase().replace(/ /g, '-')
    const filtered = allNames.filter(n => n.includes(q)).slice(0, 8)
    setSuggestions(filtered)
    setOpen(filtered.length > 0)
  }, [query, allNames])

  useEffect(() => {
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  async function handleSelect(name) {
    setQuery(name.replace(/-/g, ' '))
    setOpen(false)
    setSearching(true)
    try {
      const data = await apiFn(name)
      onResult(data)
    } catch (err) {
      onError?.(err)
    } finally {
      setSearching(false)
    }
  }

  function handleChange(e) {
    setQuery(e.target.value)
    if (!e.target.value) onResult(null)
  }

  return (
    <div ref={containerRef} className="relative">
      {label && <label className="block text-sm text-white/70 mb-1">{label}</label>}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="input-field"
        autoComplete="off"
      />
      {searching && (
        <p className="text-xs text-white/40 mt-1 pl-1 animate-pulse">Buscando...</p>
      )}
      {open && !disabled && (
        <ul className="absolute z-50 w-full mt-1 bg-poke-secondary border border-white/20 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto">
          {suggestions.map(name => (
            <li
              key={name}
              onMouseDown={() => handleSelect(name)}
              className="px-3 py-2 capitalize text-sm text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
            >
              {name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
