/* eslint-disable react/prop-types */

const Button = ({name, icon, style, onClick, type}) => {
  return (
    <button type={type || 'button'} onClick={onClick} className={`${style} bg-[#FF2511] px-5 rounded-lg items-center py-2 flex justify-center text-sm gap-3 overflow-hidden font-semibold text-white`}>
        {name} {icon}
    </button>
  )
}

export default Button