import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './components/layouts'
import Goals from './pages/goal'

function App() {

  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/goals" element={<Goals/>} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App
