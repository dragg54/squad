import { Link } from "react-router-dom"
import InviteButton from "../../components/buttons/InviteButton"
import ProfileCard from "./components/ProfileCard"

const Squad = () => {
    return (
        <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[28rem]">  
            <div className="md:w-[60%] pb-36">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold md:text-2xl">Squad Members</p>
                        <p className="!text-gray-500 text-sm">Know your squad members</p>
                    </div>
                    <div>
                        <InviteButton />
                    </div>
                </div>
                <div className="mt-10">
                    <Link to={"/member"}><ProfileCard /></Link>
                    <Link to={"/member"}><ProfileCard /></Link>
                    <Link to={"/member"}><ProfileCard /></Link>
                    <Link to={"/member"}><ProfileCard /></Link>
                    <Link to={"/member"}><ProfileCard /></Link>
                </div>
            </div>
        </section>
    )
}

export default Squad