/* eslint-disable react/prop-types */
import Menu from '../containers/Menu'
import Navbar from './Navbar'
import { useState } from 'react'

const Layout = ({children}) => {
    const [menuContainerOpened, setMenuContainerOpened] = useState(undefined)
  return (
    <div className='w-full relative'>
        <Menu {...{menuContainerOpened, setMenuContainerOpened}}/>
        <Navbar {...{setMenuContainerOpened}}/>
        {children}
    </div>
  )
}

export default Layout