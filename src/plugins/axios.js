import axios from 'axios'

// Lit VITE_API_URL depuis le fichier .env, avec une valeur par défaut
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apis.divtec.me'

// Instance réutilisable : api.get('/api/nasa/anomaly') → https://apis.divtec.me/api/nasa/anomaly
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'fr',
  },
})

export default api
