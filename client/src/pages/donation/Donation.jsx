import { PiTarget } from "react-icons/pi";
import { GiWallet } from "react-icons/gi";
import DonorBox from "./components/DonorBox";
import Button from "../../components/buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { getDonationPayments } from "../../services/donation";
import { useQuery } from "react-query";
import DonationStatusBar from "./components/DonationStatusBar";
import BackButton from "../../components/buttons/BackButton";

const Donation = () => {
    const state = useLocation().state
    const {data: donationData, isLoading: donationDataLoading } = useQuery(['donationPayments', state.donation.id], () => getDonationPayments( state.donation.id))
    if(!donationDataLoading){
        console.log(donationData)
    }
    const navigate = useNavigate()
    return (
        <section className="w-full md:w-3/5 h-screen  p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem] pb-20">
            <BackButton />
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold ">{state.donation.reason}</h1>
            <Button name='Donate' style='!border !bg-white border-gray-600 !text-gray-600' onClick={()=>navigate(`donate`, {state: {donationId: state.donation.id}})}/>
            </div>
            <div className="flex gap-2">
                <p className="bg-[#ca5cf1] flex items-center gap-1 p-1"><span className="font-semibold text-xs inline-flex gap-1 md:text-base items-center p-1"><PiTarget /> Target</span>: #{state.donation.targetAmount}</p>
                <p className="bg-[#ffb85d] flex items-center gap-1 p-1"><span className="font-semibold text-xs inline-flex gap-1 md:text-base items-center p-1"><GiWallet /> Total Donation</span>: #{state.donation.totalAmount}</p>
            </div>
                <DonationStatusBar donation={state.donation}/>
                <div className="mt-6 flex flex-col gap-2 md:h-[500px] overflow-y-scroll mb-20">
                    {
                        donationData && donationData.length > 0 && donationData.map((donationPayment)=>(
                            <DonorBox key={donationPayment.id} donationPayment={donationPayment}/>
                        ))
                    }
                </div>
        </section>
    )
}

export default Donation