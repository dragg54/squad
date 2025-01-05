import { GiCheckMark } from "react-icons/gi";

const UserEmailVerified = () => {
    return (
        <div className='w-full pt-40 flex flex-col items-center justify-start p-3 h-screen'>
            <div className="w-28 h-28 text-5xl text-green-700 rounded-full border shadow-md flex justify-center items-center">
                <GiCheckMark />
            </div>
        </div>
    )
}

export default UserEmailVerified