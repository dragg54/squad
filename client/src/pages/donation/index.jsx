import { useNavigate } from "react-router-dom"
import AddButton from "../../components/buttons/AddButton"
import DonationBox from "./components/DonationBox"
import { useQuery } from "react-query"
import { getDonations } from "../../services/donation"

const Donations = () => {
  const navigate = useNavigate()
  const {data: donationData, isLoading: isLoadingDonation } = useQuery('donations',
    {queryFn: getDonations}
  )
  if(isLoadingDonation){
    console.log("Loading")
  }
  return (
    <section className="w-full md:w-[50%] !overflow-visible p-2  md:p-8 pb-10 md:pb-48 md:ml-[20rem]">
      <div className="flex justify-between !overflow-y-visible  items-center mt-4">
        <div>
        <h1 className="text-2xl font-bold">Donations</h1>
        <small className="text-gray-500">Contribute to financial goals</small>
        </div>
        <AddButton style='!bg-white border !border-gray-500 !text-gray-600' name='Create Donation' onClick={() => navigate('create')} />
      </div>
      <div className="mt-10 h-[500px] overflow-y-scroll">
        {
          donationData && donationData.length > 0 && donationData.map(donation =>(
            <DonationBox key={donation.id} donation={donation}/>
          ))
        }
      </div>
    </section>
  )
}

export default Donations