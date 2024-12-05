import Item from "./Item"

/* eslint-disable react/prop-types */
const ItemAndCategory = ({ itemCategory }) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold mt-6">{itemCategory?.categoryName}</h1>
      <small className="text-gray-500">{itemCategory?.description}<applet></applet></small>
      <div className="mt-3 flex gap-2 md:gap-1 md:gap-y-3 flex-wrap md:flex-row  flex-col md:justify-start justify-between">
       {itemCategory.items.map((item)=>(
        <Item {...{item}} key={item.id}/>
       ))}
      </div>
    </div>
  )
}

export default ItemAndCategory