import Button from './'
import { FaPlus } from "react-icons/fa6";


const CreatePost = () => {
  return (
    <Button style={'!bg-white !text-purple-700 border border-purple-500'} name="Create Post" icon={<FaPlus />}/>
  )
}

export default CreatePost