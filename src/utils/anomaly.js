const API_URL = 'https://apis.divtec.me'

// Image servie par l'API, avec repli sur les images hébergées par la NASA
export function imageUrl (anomaly) {
  if (anomaly.links0Href) {
    return `${API_URL}${anomaly.links0Href}`
  }
  return fallbackImageUrl(anomaly)
}

export function fallbackImageUrl (anomaly) {
  const links = anomaly.linksHref ?? []
  return links.find(l => l.includes('~small')) ?? links[0] ?? ''
}

export function formatDate (date) {
  return new Date(date).toLocaleDateString('fr-CH', { dateStyle: 'long' })
}
