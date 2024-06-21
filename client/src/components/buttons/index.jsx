/* eslint-disable react/prop-types */

const Button = ({name, icon}) => {
  return (
    <button className="bg-[#8155BA] px-5 rounded-md items-center py-2 flex justify-between text-sm gap-3 font-semibold text-white rouned-md shadow-md shadow-gray-500">
        {name} {icon}
    </button>
  )
}

export default Button