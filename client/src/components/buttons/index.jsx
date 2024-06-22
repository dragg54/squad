/* eslint-disable react/prop-types */

const Button = ({name, icon}) => {
  return (
    <button className="bg-[#8155BA] px-5 rounded-md items-center py-2 flex justify-between text-sm gap-3 overflow-hidden font-semibold text-white  shadow-md shadow-purple-500">
        {name} {icon}
    </button>
  )
}

export default Button