/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Button from "../../components/buttons"
import Input from "../../components/inputs"
import { useMutation } from "react-query"
import { createInvite } from "../../services/invite"

const Invitation = () => {
  const [inviteResponse, setInviteResponse ] = useState()
  const inviteMutation = useMutation(createInvite, {
    onSuccess:(resp)=>setInviteResponse(resp),
    onError:(error)=> console.log(error)
  })
  useEffect(()=>{
    inviteMutation.mutate()
  }, [])
  return (
    <section className="w-full  h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem] pb-20">  
        <div className="w-full">
           <h1 className="text-2xl font-bold">Invite User</h1>
           <p className="mt-4">New users can be invited by email</p>
           <Input placeholder='Enter user email' style={'md:w-[600px]'}/>
           <Button name='Send'style='mt-1 !bg-purple-500'/>
           <p className="my-4 text-xl font-semibold">or copy link</p>
           <textarea className="w-full h-32 outline-none md:w-[600px] border border-gray-300 p-4 pr-4 text-gray-600 whitespace-normal" value={inviteResponse && inviteResponse}>{inviteResponse && inviteResponse}</textarea>
        </div>
    </section>
  )
}

export default Invitation