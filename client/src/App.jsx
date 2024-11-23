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
import Invitation from './pages/invitation/index'
import Login from './pages/login'
import LeaderBoard from './pages/leaderBoard'
import Post from './pages/post/Post'
import ProtectedRoute from './components/route/ProtectedRoute'
import { useEffect } from 'react'
import { socket } from './utils/Socket'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './redux/reducers/NotificationReducer'
import Donations from './pages/donation'
import Donation from './pages/donation/Donation'
import CreateDonation from './pages/donation/CreateDonation'
import Donate from './pages/donation/Donate'
import UserAvatar from './pages/register/UserAvatar'
import Momentom from './pages/momentom'
import NotFound from './pages/notFound'
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
      <Routes>
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/member" element={<Squad />} />
            <Route path="/member/:id" element={<Member />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/donation" element={<Donations />} />
            <Route path="/donation/:id" element={<Donation />} />
            <Route path="/donation/create" element={<CreateDonation />} />
            <Route path="/donation/:id/donate" element={<Donate />} />
          </Route>
        </Route>

        <Route path="/intro" element={<Intro />} />
        <Route path="/register/userAvatar" element={<UserAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Momentom/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
