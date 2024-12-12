/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef } from "react"
import DateInput from "./DateInput"
import SelectInput from "./SelectInput"

const Input = forwardRef(({ style,
  placeholder,
  maxLength,
  name,
  hasError,
  isSelected,
  type,
  onChange,
  inputMode,
  checked,
  value,
  data,
  id,
  onClick,
  done,
  readonly,
  onSelect
}, ref) => {
  if (!type || type == "text"
    || type == "password"
  ) {
    return (
      <input onChange={onChange || null}
        type={type || 'text'}
        value={value}
        name={name}
        maxLength={maxLength}
        inputMode={inputMode}
        ref={ref}
        readOnly={readonly}
        placeholder={placeholder}
        className={`${style} w-full border ${hasError && 'border-red-500'} rounded-md text-gray-500 outline-none p-3 mt-2`} />

    )
  }
  else if (type == 'number') {
    return (
      <input onChange={onChange || function () { return null }}
        type={'number'}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`${style} w-full ${hasError && 'border-red-500'} border rounded-md text-gray-500 outline-none p-3 mt-2`} />

    )
  }
  else if (type == "checkbox") {
    return (
      <input
        checked={checked}
        disabled={readonly}
        name={name}
        onChange={onChange}
        value={value}
        className="mr-2 w-4 h-4"
        type="checkbox" />
    )
  }
  else if (type == "select") {
    return (
      <SelectInput
        {...{ value, data, placeholder, name, onSelect, done, isSelected }}
      />
    )
  }
  else if (type == 'text-area') {
    return (
      <textarea
        className={`w-full text-gray-500 ${hasError && 'border-red-500'} outline-none p-4 rounded-md resize-none ${style}`}
        name={name}
        placeholder={placeholder}
        readOnly={readonly}
        value={value}
        rows={3}
        cols={3}
        maxLength={maxLength || 240}
        onChange={onChange} id="">
        {value}
      </textarea>
    )
  }
  else if (type == "date") {
    return <DateInput 
                id={id}
                readOnly = {readonly}
                 onDateChange={onClick} 
                 name={name} style={style} 
                 date={value} data={data} 
                 done={done} />
  }
})

export default Input