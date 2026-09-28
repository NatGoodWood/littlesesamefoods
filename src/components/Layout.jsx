import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-ice">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
