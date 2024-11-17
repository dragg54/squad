import { useNavigate } from 'react-router-dom';
import Button from './'
import { FaRegEnvelope } from "react-icons/fa6";


const InviteButton = () => {
  const navigate = useNavigate()
  return (
    <Button onClick={()=>navigate('/invitation')} style={'!bg-white !text-gray-700 border border-gray-700'} name="Invite People" icon={<FaRegEnvelope />}/>
  )
}

export default InviteButton