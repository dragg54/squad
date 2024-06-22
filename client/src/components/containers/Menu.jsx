/* eslint-disable react/prop-types */
const Menu = ({menuContainerOpened, setMenuContainerOpened}) => {
    console.log(menuContainerOpened)
  return (
    <div className={`w-screen h-screen absolute bg-[#A16AE8] z-20   ${menuContainerOpened == undefined? 'hidden': menuContainerOpened ? 'block animate-slide-down top-[0%]':'animate-slide-up block -top-[100%]'}`}>
        <ul className="mt-16  gap-10 w-full flex flex-col h-full items-center !text-gray-200">
           <li className="menus" onClick={()=>setMenuContainerOpened(false)}>Home</li>
            <li className="menus">Forum</li>
            <li className="menus">Squad</li>
            <li className="menus">Vision Board</li>
            <li className="menus">Events</li>
            <li className="menus">Settings</li>

        </ul>
    </div>
  )
}

export default Menu