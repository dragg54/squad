/* eslint-disable react/prop-types */

const DonationStatusBar = ({ donation }) => {
    const donationBarWidth = Math.floor((donation.totalAmount / donation.targetAmount) * 100)
    return (
        <div className="w-full mt-3 h-4 border border-gray-300 rounded-md relative overflow-hidden">
            <div className={` h-4 bg-[#32cd30] absolute`} style={{ width: donationBarWidth + '%' }}>
            </div>
        </div>)
}

export default DonationStatusBar