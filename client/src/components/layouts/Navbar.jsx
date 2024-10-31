/* eslint-disable react/prop-types */
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import Image from "../containers/Image";
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchPath";

const Navbar = ({ setMenuContainerOpened }) => {
 if(!useIgnoreMatchedPath())
  return (
    <div className={`w-full fixed z-40 md:h-20  h-20 border-b shadow-md shadow-gray-300 `}>
      <div className="absolute md:px-7 items-center w-full  p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Image style="h-10 w-10" source={'images/batman.jpg'} />
          <p className="font-semibold font-playwrite text-sm  text-gray-600">Hello, Mike Oliver</p>
        </div>
        <div className="flex text-2xl gap-3 items-center">
          {/* < Button style="h-9 px-2 !text-xs bg-white text-purple-700 border border-purple-700" name={"Log out"} icon={<IoLogOutOutline style={{fontSize: "1.5rem"}}/>}/> */}
          <p className="cursor-pointer md:text-3xl" ><IoNotificationsOutline /></p>
          < p className="cursor-pointer md:hidden" onClick={() => setMenuContainerOpened(true)}><IoMdMenu /></p>
        </div>
      </div>
    </div>
  )
}

export default Navbar