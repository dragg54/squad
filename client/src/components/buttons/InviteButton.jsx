import Button from './'
import { FaRegEnvelope } from "react-icons/fa6";


const InviteButton = () => {
  return (
    <Button style={'!bg-white !text-purple-700 border border-purple-500'} name="Invite People" icon={<FaRegEnvelope />}/>
  )
}

export default InviteButton