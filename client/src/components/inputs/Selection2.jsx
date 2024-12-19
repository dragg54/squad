/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Input from '.'
import { CiSearch } from "react-icons/ci";
import { closeSelectionModal, openSelectionModal, selectOption } from '../../redux/reducers/Selection2Reducer';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Selection2 = ({ name, showSearch, height, setSelectionName, content, fieldName,selected, icon, style}) => {
    const selection = useSelector(state => state.selection2)
    const dispatch = useDispatch()
    return (
        <>
            <div onClick={(e) => {
                e.stopPropagation()
                setSelectionName(name)
                dispatch(openSelectionModal({
                    content: content,
                    name: name
                }))
            }}
                className={`${style} mt-6 cursor-pointer flex justify-center text-sm py-1 items-center gap-1 px-2 bg-gray-100 border border-gray-300  w-auto relative`}>
                {!selected && icon}
                <p>{selected || selection.selected.find(sel => sel.name == name)?.label || fieldName}</p>
                <p><RiArrowDropDownLine className="text-xl" /></p>
            </div>
            <div style={{ height }} className={` py-2 bg-white overflow-scroll h-${height || 'auto'} ${(selection?.isOpen && name == selection.name) ? 'flex' : 'hidden'}
     font-normal overflow-y-scroll w-[250px] rounded-md  top-8 border border-gray-300
      left-1 flex-col shadow-md shadow-gray-300 z-50 absolute`}>
                <div className={`relative w-full !text-sm px-3 ${!showSearch ? 'hidden' : 'relative'}`}>
                    <Input
                        style='!py-1 !pl-6 !border border-purple-500'
                        placeholder='Filter month'
                    />
                    <CiSearch className='absolute m-[1%] text-gray-500 top-[37%]' />
                </div>
                <ul className='mt-3 font-normal gap-1  flex flex-col'>
                    {
                        selection?.content?.filter(cont => cont.name == selection.name).map((content, index) => (
                            <li onClick={(e) => {
                                e.stopPropagation()
                                dispatch(selectOption(content))
                                dispatch(closeSelectionModal())
                            }} key={index} className={` hover:bg-gray-400 hover:cursor-pointer py-1 px-4 ${selection?.selected.label == content.label && 'bg-gray-400'}`}>
                                <p className=''>{content.label}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Selection2