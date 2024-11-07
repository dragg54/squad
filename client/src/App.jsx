import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './components/layouts'
import Forum from './pages/post'
import Squad from './pages/squad'
import Member from './pages/squad/Member'
import Goals from './pages/goals'
import Intro from './pages/intro'
import Register from './pages/register'
import Login from './pages/login'
import Post from './pages/post/Post'
import ProtectedRoute from './components/route/ProtectedRoute'
import { useEffect } from 'react'
import { socket } from './utils/Socket'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './redux/reducers/NotificationReducer'
// import Notification from './pages/notifications'


function App() {
  const user = useSelector(state => state.user)
  const message = useSelector(state => state.notification)
  socket.emit('register', user.id);
  const dispatch = useDispatch()
  
  useEffect(() => {
    try {

      // Listen for notifications sent to this user
      socket.on('receiveNotification', () => {
        console.log("sending notification...")
          dispatch(addNotification())
      });
      
    } catch (err) {
        console.log('Error:', err);
    }

    return () => {
        socket.off('receiveNotification');
    };
}, [message]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/forum" element={<Forum />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/member" element={<Squad />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/member/:id" element={<Member />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/goals" element={<Goals />} />
          </Route>

          {/* <Route element={<ProtectedRoute />}>
            <Route path="/notifications" element={<Notification />} />
          </Route> */}

          <Route path="/register" element={<Register />} />

          <Route path="/intro" element={<Intro />} />

          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/post/:id" element={<Post />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
