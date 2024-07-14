/* eslint-disable react/prop-types */
import Menu from '../containers/Menu'
import GlobalModal from '../modals/GlobalModal'
import Navbar from './Navbar'
import { useState } from 'react'

const Layout = ({ children }) => {
  const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  return (
    <div className='w-full relative'>
      <GlobalModal />
      <Menu {...{ menuContainerOpened, setMenuContainerOpened }} />
      <Navbar {...{ setMenuContainerOpened }} />
      {children}
    </div>
  )
}

export default Layout