/* eslint-disable react/prop-types */

const Input = ({style, placeholder, name}) => {
  return (
    <input name={name} placeholder={placeholder} className={`${style} w-full border rounded-md outline-none p-3 mt-3`} type="text" />
  )
}

export default Input