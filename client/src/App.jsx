import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './components/layouts'
import Forum from './pages/goal'
import Squad from './pages/squad'
import Member from './pages/squad/Member'
import Goals from './pages/goals'
import Intro from './pages/intro'

function App() {

  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/forum" element={<Forum/>} />
        <Route path="/squad" element={<Squad/>} />
        <Route path="/member" element={<Member/>} />
        <Route path="/goals" element={<Goals/>} />
        <Route path="/intro" element={<Intro/>} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App
