import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './components/layouts'
import Forum from './pages/goal'
import Squad from './pages/squad'
import Member from './pages/squad/Member'
import Goals from './pages/goals'
import Intro from './pages/intro'
import Register from './pages/register'
import Login from './pages/login'

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
        <Route path="/register" element={<Register/>} />
        <Route path="/intro" element={<Intro/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App
