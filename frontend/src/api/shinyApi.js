import api from './axiosConfig'

export async function calculateShiny(data) {
  const response = await api.post('/shiny/calculate', data)
  return response.data
}

export async function getShinyPokemon(name) {
  const response = await api.get('/shiny/pokemon', { params: { name } })
  return response.data
}
