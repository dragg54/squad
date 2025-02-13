import { Link, useLocation } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { MdForum } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { LuGoal } from "react-icons/lu";
import { FaClipboard } from "react-icons/fa";
// import { MdOutlinePayment } from "react-icons/md";
import { BsShop } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";



const Sidebar = () => {
  const location = useLocation()
  const url = location.pathname
  const pathsToIgnore = ["intro", "login", "register"]
  const matchFound = pathsToIgnore.some(pattern => url.includes(pattern));
  return (
    <div className={`w-full h-screen bg-gray-50 border-r ${matchFound && 'hidden'}`}>
      <ul className="gap-10 w-full flex flex-col  items-start ml-4 !text-gray-200 ">
        <li className="menus mt-12" ><GoHome /><Link className="menus" to="/home">Home</Link></li>
        <li className="menus"><MdForum /><Link className="menus" to="/forum">Forum</Link></li>
        <li className="menus"><LuUsers /><Link className="menus" to="/member">Squad</Link></li>
        <li className="menus"><LuGoal /><Link className="menus" to="/goals">Goals</Link></li>
        <li className="menus"><FaClipboard /><Link className="menus" to="/leaderboard">Leaderboard</Link></li>
        {/* <li className="menus" ><MdOutlinePayment /><Link className="menus" to="/donation">Donation</Link></li> */}
        <li className="menus"><BsShop /><Link className="menus" to="/shop">{"Tom's"} Shop</Link></li>
        {/* <li className="menus"><IoSettingsOutline /><Link className="menus" to="/settings"> Settings</Link></li> */}
      </ul>
    </div>
  )
}

export default Sidebar