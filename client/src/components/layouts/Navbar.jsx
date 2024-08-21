/* eslint-disable react/prop-types */
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";

const Navbar = ({setMenuContainerOpened}) => {
  const location = useLocation()
  const url = location.pathname
  const pathsToIgnore = ["intro", "login", "register"]
  const matchFound = pathsToIgnore.some(pattern => url.includes(pattern));
  return (
    <div className={`w-full ${matchFound && 'hidden'} h-14 border-b z-10 shadow-md shadow-gray-300 p-4 flex justify-between`}>
        <div>
        <p className="font-semibold font-playwrite text-sm  text-gray-600">Hello, Mike Oliver</p>
        </div>
        <div className="flex text-2xl gap-3">
            <p className="cursor-pointer" ><IoNotificationsOutline /></p>
            < p className="cursor-pointer" onClick={()=>setMenuContainerOpened(true)}><IoMdMenu /></p>
        </div>
    </div>
  )
}

export default Navbar