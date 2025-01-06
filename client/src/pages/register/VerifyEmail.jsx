import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/user";
import { useEffect } from "react";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email")
  const navigate = useNavigate()
  const verifyTokenMutation = useMutation(verifyEmail, 
    {
        onSuccess:() => navigate("/emailVerified"),
        onError: (err) =>{
          console.log(err)
          navigate("login", {state:{ email}})
        }
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
       
    </div>
  )
}

export default VerifyEmail