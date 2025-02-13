/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { MdForum } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { LuGoal } from "react-icons/lu";
import { FaClipboard } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";
// import { MdOutlineSettings } from "react-icons/md";
const Menu = ({menuContainerOpened, setMenuContainerOpened}) => {
  return (
    <div className={`w-screen z-50 h-screen fixed bg-gray-50  ${menuContainerOpened == undefined? 'hidden ': menuContainerOpened ? 'block animate-slide-down  top-[0%]':'animate-slide-up block  -top-[150%]'}`}>
       <div className="w-full flex justify-center">
        <ul className="mt-14 gap-10 flex flex-col h-full  !text-gray-200">
          <li className="menus" onClick={()=>setMenuContainerOpened(false)}><GoHome /><Link className="menus" to="/home">Home</Link></li>
          <li className="menus" onClick={()=>setMenuContainerOpened(false)} ><MdForum /><Link className="menus" to="/forum">Forum</Link></li>
          <li className="menus" onClick={()=>setMenuContainerOpened(false)}><LuUsers /><Link className="menus" to="/member">Squad</Link></li>
          <li className="menus" onClick={()=>setMenuContainerOpened(false)}><LuGoal /><Link className="menus" to="/goals">Goals</Link></li>
          <li className="menus" onClick={()=>setMenuContainerOpened(false)}><FaClipboard /><Link className="menus" to="/leaderboard">Leaderboard</Link></li>
          {/* <li className="menus" onClick={()=>setMenuContainerOpened(false)}><MdOutlinePayment/><Link className="menus" to="/donation">Donation</Link></li> */}
          <li className="menus" onClick={()=>setMenuContainerOpened(false)}><BsShop/><Link className="menus" to="/shop">{"Tom's"} Shop</Link></li>
          {/* <li className="menus" onClick={()=>setMenuContainerOpened(false)}><IoSettingsOutline /><Link className="menus" to="/settings"> Settings</Link></li> */}
        </ul>
      </div>
    </div>
  )
}

export default Menu