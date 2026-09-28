import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Gallery from './pages/Gallery.jsx'
import Admin from './pages/Admin.jsx'
import Contact from './pages/Contact.jsx'
import Directors from './pages/Directors.jsx'
import ProductCategory from "./components/ProductCategory";

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="*" element={<Home />} />
          <Route path="/products/:category" element={<ProductCategory />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}
