import { IoNewspaperOutline } from "react-icons/io5";

const News = () => {
    return (
        <div className='w-full'>
            <div className='w-full border-4 border-black p-4 rounded-md shadow-md shadow-gray-300 bg-[#21B6A8] h-[200px] mt-6'>
                <div className="flex gap-4 items-center">
                    <p className="text-4xl text-black"><IoNewspaperOutline /></p>
                    <div>
                        <h1 className="text-black text-2xl font-semibold">Squad News</h1>
                        {/* <div className="mt-1 w-1/5 bg-yellow-400 h-1"></div> */}
                    </div>
                </div>
                <p className="mt-5 text-black">This is a reminder that our upcoming event shall be taking place at @MFA house. Please let us endeavour to be there. -Spiky</p>
            </div>
        </div>
    )
}

export default News