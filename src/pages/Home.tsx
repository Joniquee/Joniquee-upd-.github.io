import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Добро пожаловать на мой сайт</h1>
        <p className="subtitle">Здесь вы найдете интересный контент о котах, криптовалютах и последние новости</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>🐱 Коты</h2>
          <p>Милые фотографии и факты о котах</p>
        </div>

        <div className="feature-card">
          <h2>💰 Криптовалюты</h2>
          <p>Актуальные курсы и аналитика крипторынка</p>
        </div>

        <div className="feature-card">
          <h2>📰 Новости</h2>
          <p>Свежие новости из мира технологий</p>
        </div>
      </section>
    </div>
  )
}

export default Home