/* eslint-disable react/prop-types */
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Image from "../containers/Image";

const Navbar = ({setMenuContainerOpened}) => {
  const location = useLocation()
  const url = location.pathname
  const pathsToIgnore = ["intro", "login", "register"]
  const matchFound = pathsToIgnore.some(pattern => url.includes(pattern));
  return (
    <div className={`w-full z-50 md:px-7 items-center md:h-20 ${matchFound && 'hidden'} h-14 border-b shadow-md shadow-gray-300 p-4 flex justify-between`}>
        <div className="flex items-center gap-2">
          <Image style="h-10 w-10" source={'images/batman.jpg'}/>
        <p className="font-semibold font-playwrite text-sm  text-gray-600">Hello, Mike Oliver</p>
        </div>
        <div className="flex text-2xl gap-3 items-center">
            {/* < Button style="h-9 px-2 !text-xs bg-white text-purple-700 border border-purple-700" name={"Log out"} icon={<IoLogOutOutline style={{fontSize: "1.5rem"}}/>}/> */}
            <p className="cursor-pointer md:text-3xl" ><IoNotificationsOutline /></p>
            < p className="cursor-pointer md:hidden" onClick={()=>setMenuContainerOpened(true)}><IoMdMenu /></p>
        </div>
    </div>
  )
}

export default Navbar