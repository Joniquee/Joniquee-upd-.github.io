import { useState, useEffect } from 'react'
import './Crypto.css'

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  image: string
}

const Crypto = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
        )
        if (!response.ok) throw new Error('Ошибка загрузки данных')
        const data = await response.json()
        setCryptos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }

    fetchCrypto()
    const interval = setInterval(fetchCrypto, 60000) // Обновление каждую минуту
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatMarketCap = (cap: number) => {
    return new Intl.NumberFormat('ru-RU', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(cap)
  }

  if (loading) return <div className="loading">Загрузка данных...</div>
  if (error) return <div className="error">Ошибка: {error}</div>

  return (
    <div className="crypto-page">
      <h1>Криптовалюты 💰</h1>
      <p className="subtitle">Топ-10 криптовалют по капитализации</p>

      <div className="crypto-table">
        <div className="table-header">
          <div>#</div>
          <div>Название</div>
          <div>Цена</div>
          <div>Изменение 24ч</div>
          <div>Капитализация</div>
        </div>

        {cryptos.map((crypto, index) => (
          <div key={crypto.id} className="table-row">
            <div className="rank">{index + 1}</div>
            <div className="crypto-name">
              <img src={crypto.image} alt={crypto.name} />
              <span>{crypto.name}</span>
              <span className="symbol">{crypto.symbol.toUpperCase()}</span>
            </div>
            <div className="price">{formatPrice(crypto.current_price)}</div>
            <div className={`change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
              {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </div>
            <div className="market-cap">${formatMarketCap(crypto.market_cap)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Crypto