import { Link, useLocation } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { MdForum } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { LuGoal } from "react-icons/lu";
import { FaClipboard } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";


const Sidebar = () => {
  const location = useLocation()
  const url = location.pathname
  const pathsToIgnore = ["intro", "login", "register"]
  const matchFound = pathsToIgnore.some(pattern => url.includes(pattern));
  return (
    <div className={`w-full h-screen bg-gray-50 border-r ${matchFound && 'hidden'}`}>
        <ul className="mt-10  gap-10 w-full flex flex-col h-full items-start ml-4 !text-gray-200">
           <li className="menus" ><GoHome /><Link className="menus" to="/">Home</Link></li>
            <li  className="menus"><MdForum /><Link className="menus" to="/forum">Forum</Link></li>
            <li  className="menus"><LuUsers /><Link className="menus" to="/squad">Squad</Link></li>
            <li  className="menus"><LuGoal /><Link className="menus" to="/goals">Goals</Link></li>
            <li className="menus"><FaClipboard/>Vision Board</li>
            <li className="menus"><MdEventAvailable/>Events</li>
            <li className="menus"><MdOutlineSettings/>Settings</li>

        </ul>
    </div>
  )
}

export default Sidebar