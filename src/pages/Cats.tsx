import { useState, useEffect } from 'react'
import './Cats.css'

interface CatImage {
  id: string
  url: string
}

const Cats = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=6')
      if (!response.ok) throw new Error('Ошибка загрузки котов')
      const data = await response.json()
      setCatImages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  return (
    <div className="cats-page">
      <h1>Милые Котики 🐱</h1>
      
      <button onClick={fetchCats} className="refresh-btn" disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить новых котов'}
      </button>

      {error && <p className="error">Ошибка: {error}</p>}

      <div className="cats-grid">
        {catImages.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt="Милый кот" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cats