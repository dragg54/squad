import { BsChatQuote } from "react-icons/bs";

const Quotes = () => {
    return (
        <div className='w-full border-black border-4 mt-4 h-[220px] p-4 rounded-md shadow-md shadow-gray-300 bg-[#FD7F20]'>
            <div className="flex gap-4 items-center">
                <p className="text-4xl text-black"><BsChatQuote /></p>
                <div>
                    <h1 className="text-black text-2xl font-semibold">Team Talks</h1>
                    {/* <div className="mt-1 w-1/5 bg-yellow-400 h-1"></div> */}
                </div>
            </div>
                    <p className="mt-5 text-black">Wake up my guy and keep doing it. One day you shall fulfil your goals and what belongs to you shall be yours</p>

        </div>
    )
}

export default Quotes