import { useState, useEffect } from 'react'
import { searchPokemon } from '../api/pokemonApi'

export default function usePokemonSearch(query, delay = 500) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setPokemon(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const data = await searchPokemon(query.trim().toLowerCase())
        setPokemon(data)
      } catch (err) {
        setPokemon(null)
        if (err.response?.status === 404) {
          setError('Pokemon no encontrado')
        } else {
          setError('Error al buscar el pokemon')
        }
      } finally {
        setLoading(false)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  return { pokemon, loading, error }
}
