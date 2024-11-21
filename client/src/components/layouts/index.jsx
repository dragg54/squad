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

const Layout = ({ children }) => {
  const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  const [openNotificationContainer, setOpenNotificationContainer] = useState(false)
  return (
    <div className='w-full relative md:overflow-visible' onClick={()=>{
      setOpenNotificationContainer(false)
    }}>
      <GlobalModal />
      <PopUp />
      <Menu {...{ menuContainerOpened, setMenuContainerOpened }} />
      <Navbar {...{ setMenuContainerOpened, setOpenNotificationContainer, openNotificationContainer }} />
      <NotificationContainer {...{openNotificationContainer}}/>
      <main className='w-full md:flex gap-20 fixed top-20'>
        <div className='w-[20%] hidden md:block absolute'>
          <Sidebar />
        </div>
        <div className="md:w-[85%] md:ml-20 w-full z-10">
          <Outlet />
        </div>
        <Aside />
      </main>
    </div>
  )
}

export default Layout