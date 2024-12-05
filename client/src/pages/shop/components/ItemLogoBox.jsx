/* eslint-disable react/prop-types */

const ItemLogoBox = ({itemName}) => {
  return (
    <div className="w-[60px] md:w-[50px] md:h-3/5 h-4/5 bg-purple-700 rounded-md shadow-md shadow-purple-700 flex items-center justify-center">
        <h1 className="text-white text-xl">{itemName[0]}</h1>
    </div>
  )
}

export default ItemLogoBox