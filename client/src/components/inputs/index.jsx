/* eslint-disable react/prop-types */

const Input = ({style, placeholder, name, type, onChange, checked, value}) => {
  return (
    <input onChange={onChange || function(){return null}}
     type={type || 'text'}
     value= {value}
     checked = {checked}
     name={name}
     placeholder={placeholder}
     className={`${style} w-full border rounded-md text-gray-500 outline-none p-3 mt-3`} />
  )
}

export default Input