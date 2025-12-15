import { Outlet, Link } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/cats" className="nav-link">Коты</Link>
          <Link to="/crypto" className="nav-link">Крипто</Link>
          <Link to="/news" className="nav-link">Новости</Link>
        </nav>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 Joniquee. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default Layout