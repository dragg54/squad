/* eslint-disable react/prop-types */

const Button = ({name, icon, style, onClick, type, disabled}) => {
  return (
    <button 
      type={type || 'button'}
      disabled={disabled == null ? false: true}
      onClick={onClick} 
      className={`${style} ${disabled ? 'bg-[#b19ff9]': 'bg-[#9619b2]'}
      px-5 rounded-lg items-center py-2 flex justify-center text-sm gap-3 overflow-hidden font-semibold text-white`}>
      {name} {icon}
    </button>
  )
}

export default Button