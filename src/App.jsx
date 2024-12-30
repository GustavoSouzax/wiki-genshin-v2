import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Home from './components/pages/Home'
import Personagens from './components/pages/Personagens'
import Noticias from './components/pages/Noticias'
import Sobre from './components/pages/Sobre'
import Personagem from './components/pages/Personagem'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Social from './components/layout/Social'

function App() {
  return (
    <Router>
      <Header />
      <Social />
      <Routes>
        <Route path="/wiki-genshin-v2" element={<Home />} />
        <Route path="/personagens" element={<Personagens />} />
      </Routes>
      <Container customClass={"containerPages"}>
        <Routes>
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path='/personagem' element={<Personagem />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App