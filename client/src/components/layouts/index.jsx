/* eslint-disable react/prop-types */
import Menu from '../containers/Menu'
import GlobalModal from '../modals/GlobalModal'
import PopUp from '../popups'
import Navbar from './Navbar'
import { useState } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  return (
    <div className='w-full relative md:overflow-visible'>
      <GlobalModal />
      <PopUp />
      <Menu {...{ menuContainerOpened, setMenuContainerOpened }} />
      <Navbar {...{ setMenuContainerOpened }} />
      <main className='w-full md:flex gap-20 fixed top-20'>
        <div className='w-[20%] hidden md:block absolute'>
          <Sidebar />
        </div>
        <div className='md:w-[85%] md:ml-20 w-full '>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout