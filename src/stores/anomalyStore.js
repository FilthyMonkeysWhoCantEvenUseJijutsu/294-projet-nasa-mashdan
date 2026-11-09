import api from '@/plugins/axios'

export const useAnomalyStore = defineStore('anomaly', {
  state: () => ({
    anomalies: [],
    isLoading: false,
    error: null,
    favorites: [],
  }),

  getters: {
    totalAnomalies: state => state.anomalies.length,

    // Nombre total de favoris
    totalFavorites: state => state.favorites.length,

    // Vérifie si une anomalie est favorite
    isFavorite: state => {
      return anomaly => {
        return state.favorites.includes(anomaly.id)
      }
    },

    // Retourne les objets anomalie favoris (pas juste les IDs)
    getFavorites: state => {
      const favoriteAnomalies = state.favorites.map(favoriteId => {
        return state.anomalies.find(anomaly => anomaly.id === favoriteId)
      })
      return favoriteAnomalies.filter(anomaly => anomaly !== undefined)
    },

    // Centres NASA présents dans les données, sans doublon, triés
    centers: state => [...new Set(state.anomalies.map(a => a.center))].toSorted(),

    getAnomalyById: state => {
      return anomalyId => {
        return state.anomalies.find(a => a.id === Number(anomalyId))
      }
    },
  },

  actions: {
    async fetchAnomalies ({ withLoader = true } = {}) {
      if (withLoader) {
        this.isLoading = true
      }

      try {
        const response = await api.get('/api/nasa/anomaly', { params: { limit: 100 } })
        this.anomalies = response.data.data
        this.error = null
        this.cleanupFavorites()
      } catch (error) {
        console.error('Erreur:', error.message)
        this.anomalies = []
        this.error = error.message
      } finally {
        if (withLoader) {
          this.isLoading = false
        }
      }
    },

    async init () {
      this.isLoading = true
      // Favoris chargés avant l'API : cleanupFavorites() peut ensuite retirer les obsolètes
      this.loadFavorites()
      try {
        await Promise.all([
          this.fetchAnomalies({ withLoader: false }),
        ])
      } finally {
        this.isLoading = false
      }
    },

    // Charge les favoris depuis localStorage
    loadFavorites () {
      try {
        const savedFavorites = localStorage.getItem('anomaly_favorites')
        this.favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      } catch (error) {
        console.error('Erreur lors du chargement des favoris :', error)
        this.favorites = []
      }
    },

    // Sauvegarde les favoris dans localStorage
    saveFavorites () {
      try {
        localStorage.setItem('anomaly_favorites', JSON.stringify(this.favorites))
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris :', error)
      }
    },

    // Ajoute ou retire une anomalie des favoris
    toggleFavorite (anomaly) {
      const favoriteIndex = this.favorites.indexOf(anomaly.id)

      if (favoriteIndex === -1) {
        this.favorites.push(anomaly.id)
      } else {
        this.favorites.splice(favoriteIndex, 1)
      }

      this.saveFavorites()
    },

    // Supprime les favoris dont l'anomalie n'existe plus dans l'API
    cleanupFavorites () {
      const initialCount = this.favorites.length

      this.favorites = this.favorites.filter(favoriteId => {
        return this.anomalies.some(anomaly => anomaly.id === favoriteId)
      })

      if (this.favorites.length < initialCount) {
        this.saveFavorites()
      }
    },
  },
})
