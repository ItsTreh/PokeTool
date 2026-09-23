import api from './axiosConfig'

export async function searchPokemon(name) {
  const response = await api.get('/pokemon/search', { params: { name } })
  return response.data
}

export async function searchMove(name) {
  const response = await api.get('/moves/search', { params: { name } })
  return response.data
}

export async function searchItem(name) {
  const response = await api.get('/items/search', { params: { name } })
  return response.data
}

export async function getGames() {
  const response = await api.get('/games')
  return response.data
}

export async function validateAdventure(data) {
  const response = await api.post('/nuzlocke/validate', data)
  return response.data
}
