import api from '@/plugins/axios'

export const useAnomalyStore = defineStore('anomaly', {
  state: () => ({
    anomalies: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    totalAnomalies: state => state.anomalies.length,

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
      try {
        await Promise.all([
          this.fetchAnomalies({ withLoader: false }),
        ])
      } finally {
        this.isLoading = false
      }
    },
  },
})
