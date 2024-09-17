/* eslint-disable react/prop-types */

const Input = ({style, placeholder, name, type, onChange, checked, value}) => {
    if(!type || type == "text" 
      || type == "password"
      || type == "date"
    ){
      return(
        <input onChange={onChange || function(){return null}}
          type={type || 'text'}
          value={value}
          name={name}
          placeholder={placeholder}
          className={`${style} w-full border rounded-md text-gray-500 outline-none p-3 mt-2`} />

      )
    }
    else if(type == "checkbox"){
      return(
        <input  
         checked={checked}
         name={name}
         onChange={onChange}
         value={value}
         className="mr-2 w-4 h-4"
         type="checkbox"/>
      )
    }
    else if(type == "select"){
      return(
        <select onChange={onChange} name={name} className="p-3 w-full rounded-md mt-2 text-sm text-gray-600 bg-white border">
          <option value="" className="font-semibold w-full py-4 bg-gray-300">Select Your Goal Category</option>
          {
            value?.length > 0 && value.map((val, index) => (
              <option  className="p-2" value={val.id} key={index}>{val.name}</option>
            ))
          }
        </select>
      )
    }
    else if(type == 'text-area'){
      return(
        <textarea 
          className={`w-full text-gray-500 outline-none rounded-md resize-none ${style}`} 
          name={name} 
          placeholder={placeholder}
          value={value}
          onChange={onChange} id="">
          {value}
        </textarea>
      )
    }
}

export default Input