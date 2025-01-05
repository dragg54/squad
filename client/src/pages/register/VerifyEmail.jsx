import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/user";
import Button from "../../components/buttons";
import { useEffect } from "react";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
const navigate = useNavigate()
  const verifyTokenMutation = useMutation(verifyEmail, 
    {
        onSuccess:() => navigate("/emailVerified"),
        onError: (err) => console.log(err.message)
    }
  )

  const handleVerifyEmail = () =>{
    verifyTokenMutation.mutate({token})
  }

  useEffect(()=>{
    handleVerifyEmail()
  },[])

  return (
    <div className="">
        <h1>Verify Token</h1>
        <Button type={'button'} name={'Verify'} onClick={handleVerifyEmail}/>
    </div>
  )
}

export default VerifyEmail