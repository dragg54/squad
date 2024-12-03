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

const Layout = () => {
  const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  const [openNotificationContainer, setOpenNotificationContainer] = useState(false)
  const [openUserContainer, setOpenUserContainer] = useState(false)
  const dispatch = useDispatch()
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