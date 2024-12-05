/* eslint-disable react/prop-types */
import ItemLogoBox from './ItemLogoBox'
import Button from '../../../components/buttons/index'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../redux/reducers/GlobalModalReducer'
import InsufficientPoint from '../InsufficientPoint'

const Item = ({item}) => {
    const dispatch = useDispatch()
    return (
        <div className="w-[100%] md:w-[32.5%] h-[100px]  items-center flex gap-3  p-3 shadow-sm shadow-gray-200 rounded-md border border-gray-200">
            <ItemLogoBox {...{ itemName: item.itemName}} />
            <div className="h-full flex flex-col justify-center">
                <p className="font-semibold md:text-xs whitespace-nowrap">{item.itemName}</p>
                <p className="text-[0.9rem] md:text-[0.7rem]">{item.price} GP</p>
                <p className="text-xs text-gray-500">{item.description.length > 30 ? item.description.substring(0, 30)+"...": item.description}</p>
            </div>
            <Button
            onClick={()=>dispatch(openModal({component: <InsufficientPoint />}))}
              style="!bg-white !ml-auto !mb-5 !self-end !border !border-gray-400 md:!text-xs !text-gray-600" name='Buy' />
        </div>
    )
}

export default Item