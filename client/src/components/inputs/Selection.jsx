import { useState } from 'react'
import Button from '../buttons'
import { useSelector } from 'react-redux'


const Selection = () => {
    const globalModal = useSelector(state => state.globalModal)
    const { done, value } = globalModal.content.props
    const [ selected, setSelected ] = useState(value[0].name)
    return (
        <div className='bg-white w-[96%] md:w-[400px] -mt-18  h-[600px] p-6 shadow-md' onClick={(e)=> e.stopPropagation()}>
            <h1 className='text-xl font-bold w-full py-2 border-b border-gray-300 inline-flex justify-between items-center'>
                Select Goal Category 
                <span><Button onClick={()=> done(selected, value.find(x => x.name == selected).id)} name="Done" style="!bg-purple-700"/></span>
            </h1>
            <div className='w-full flex'>
            </div>
            <ul className='mt-6 h-[450px] overflow-scroll'>
                {value && value.map((dt, index) => (
                    <li onClick={()=>setSelected(dt.name)} className={`hover:bg-purple-200 py-2 px-2 cursor-pointer ${selected == dt.name && 'bg-purple-200'}`} key={index}>{dt.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Selection