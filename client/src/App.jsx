import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './components/layouts'
import Goals from './pages/goal'
import Squad from './pages/squad'
import Member from './pages/squad/Member'

function App() {

  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/forum" element={<Goals/>} />
        <Route path="/squad" element={<Squad/>} />
        <Route path="/member" element={<Member/>} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App
