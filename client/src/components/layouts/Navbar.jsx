import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='w-full h-14 border-b shadow-md shadow-gray-300 p-4 flex justify-between'>
        <div>
        <p className="font-semibold font-playwrite text-sm  text-gray-600">Hello, Mike Oliver</p>
        </div>
        <div className="flex text-2xl gap-3">
            <p><IoNotificationsOutline /></p>
            <p><IoMdMenu /></p>

        </div>
    </div>
  )
}

export default Navbar