import { useState, useEffect } from 'react'
import './News.css'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Примечание: для работы нужен API ключ от newsapi.org
        // Замените YOUR_API_KEY на реальный ключ
        const apiKey = 'YOUR_API_KEY'
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`
        )
        
        if (!response.ok) {
          throw new Error('Для работы нужен API ключ от newsapi.org')
        }
        
        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки новостей')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) return <div className="loading">Загрузка новостей...</div>

  return (
    <div className="news-page">
      <h1>Новости Технологий 📰</h1>

      {error && (
        <div className="error-notice">
          <p>{error}</p>
          <p>
            Получите бесплатный API ключ на{' '}
            <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">
              newsapi.org
            </a>
          </p>
        </div>
      )}

      <div className="news-grid">
        {articles.length === 0 && !error ? (
          <p>Новости не найдены</p>
        ) : (
          articles.map((article, index) => (
            <article key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} loading="lazy" />
              )}
              <div className="news-content">
                <h2>{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <div className="news-meta">
                  <span className="source">{article.source.name}</span>
                  <span className="date">{formatDate(article.publishedAt)}</span>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Читать полностью →
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

export default News