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

// Les descriptions contiennent du HTML (<a>, &quot;...) : on garde le texte seul
export function plainText (html) {
  const doc = new DOMParser().parseFromString(html ?? '', 'text/html')
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

// keywords arrive sous la forme ["mot1,mot2,mot3"]
export function parseKeywords (keywords) {
  const list = (keywords ?? []).flatMap(k => k.split(',')).map(k => k.trim()).filter(Boolean)
  return [...new Set(list)]
}
