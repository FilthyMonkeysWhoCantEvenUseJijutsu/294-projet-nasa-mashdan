const API_URL = 'https://apis.divtec.me/api/nasa/anomaly?limit=100'

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
    async fetchAnomalies () {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const json = await response.json()
        this.anomalies = json.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async init () {
      this.isLoading = true
      this.error = null
      try {
        await Promise.all([
          this.fetchAnomalies(),
        ])
      } catch (error) {
        this.error = 'Erreur lors du chargement des données'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
