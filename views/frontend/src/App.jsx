
import './App.css'
import Footer from './components/common/footer'
import Header from './components/common/Header'
import CTA from './components/cta'
import Features from './components/features'
import HeroHome from './components/HeroHome'
import PageIllustrator from './components/PageIllustrator'
import Workflows from './components/workflows'

function App() {
  return (
    <>
    <Header/>
    <PageIllustrator />
      <HeroHome />
      <Workflows />
      <Features />
      <CTA />
    <Footer />
    </>
  )
}

export default App
