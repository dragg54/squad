/* eslint-disable react/prop-types */
import Menu from '../containers/Menu'
import GlobalModal from '../modals/GlobalModal'
import PopUp from '../popups'
import Navbar from './Navbar'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Aside from './Aside'
import NotificationContainer from '../../pages/notifications'
import { Outlet } from 'react-router-dom'
import CurrentUser from '../CurrentUser'
import { useDispatch } from 'react-redux'
import { closeSelectionModal } from '../../redux/reducers/Selection2Reducer'
import { useQuery } from 'react-query'
import {  getGoalReminders } from "../../services/goalReminder"
import { openModal } from '../../redux/reducers/GlobalModalReducer'
import GoalReminderNotificationSlider from '../../pages/notifications/GoalReminderNotification'

const Layout = () => {
  const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  const [openNotificationContainer, setOpenNotificationContainer] = useState(false)
  const [openUserContainer, setOpenUserContainer] = useState(false)

  const { data: goalReminders } = useQuery(['goalReminders', {isSeen: false}],
    getGoalReminders
  )
  const dispatch = useDispatch()
  if(goalReminders && goalReminders.length > 0){
    dispatch(openModal({component: <GoalReminderNotificationSlider reminders={goalReminders}/>}))
  }
  return (
    <div className='w-full relative md:overflow-visible' onClick={()=>{
      setOpenNotificationContainer(false)
      setOpenUserContainer(false)
      dispatch(closeSelectionModal())
    }}>
      <GlobalModal />
      <PopUp />
      <Menu {...{ menuContainerOpened, setMenuContainerOpened }} />
      <Navbar {...{ setMenuContainerOpened, setOpenNotificationContainer, openNotificationContainer,openUserContainer, setOpenUserContainer }} />
      <CurrentUser {...{openUserContainer, setOpenUserContainer, setOpenNotificationContainer}}/>
      <NotificationContainer {...{openNotificationContainer, setOpenUserContainer}}/>
      <main className='w-full md:flex gap-20 fixed top-20'>
        <div className='w-[20%] hidden md:block absolute'>
          <Sidebar />
        </div>
        <div className="md:w-[85%] md:ml-20 w-full">
          <Outlet />
        </div>
        <Aside />
      </main>
    </div>
  )
}

export default Layout