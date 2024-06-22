/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const Menu = ({menuContainerOpened, setMenuContainerOpened}) => {
    console.log(menuContainerOpened)
  return (
    <div className={`w-screen h-screen absolute bg-[#A16AE8] z-20   ${menuContainerOpened == undefined? 'hidden': menuContainerOpened ? 'block animate-slide-down top-[0%]':'animate-slide-up block -top-[100%]'}`}>
        <ul className="mt-16  gap-10 w-full flex flex-col h-full items-center !text-gray-200">
           <li className="menus" onClick={()=>setMenuContainerOpened(false)}><Link className="menus" to="/">Home</Link></li>
            <li onClick={()=>setMenuContainerOpened(false)} className="menus"><Link className="menus" to="/forum">Forum</Link></li>
            <li className="menus"><Link className="menus" to="/squad">Squad</Link></li>
            <li className="menus">Vision Board</li>
            <li className="menus">Events</li>
            <li className="menus">Settings</li>

        </ul>
    </div>
  )
}

export default Menu