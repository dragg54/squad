/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Input from '.'
import { CiSearch } from "react-icons/ci";
import { closeSelectionModal, selectOption } from '../../redux/reducers/Selection2Reducer';

const Selection2 = ({name}) => {
    const selection = useSelector(state => state.selection2)
    const dispatch = useDispatch()
    return (
        <div className={` py-2 bg-white h-[300px] ${!selection?.isOpen ? 'hidden' : 'flex'}
     font-normal overflow-y-scroll w-[250px] rounded-md  top-8 border border-gray-300
      left-1 flex-col shadow-md shadow-gray-300 z-50 absolute`}>
            <div className='relative w-full !text-sm px-3'>
                <Input
                    style='!py-1 !pl-6 !border border-purple-500'
                    placeholder='Filter month'
                />
                <CiSearch className='absolute m-[1%] text-gray-500 top-[37%]' />
            </div>
            <ul className='mt-3 font-normal gap-1  flex flex-col'>
                
                {
                    selection?.content?.map((content, index) =>(
                        <li onClick={(e)=>{
                            e.stopPropagation()
                            dispatch(selectOption(content))
                            dispatch(closeSelectionModal())
                        }} key={index} className={` hover:bg-purple-200 py-1 px-4 ${selection?.selected.label == content.label && 'bg-purple-200'}`}>
                        <p className=''>{(content.name == selection.name) && content.label}</p>
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Selection2