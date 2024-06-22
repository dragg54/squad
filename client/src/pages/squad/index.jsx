import { Link } from "react-router-dom"
import InviteButton from "../../components/buttons/InviteButton"
import ProfileCard from "./components/ProfileCard"

const Squad = () => {
    return (
        <section>
            <div className="w-full h-screen p-4 pb-36 overflow-y-scroll">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold">Squad Members</p>
                        <p className="!text-gray-500 text-sm">Know your members</p>
                    </div>
                    <div>
                        <InviteButton />
                    </div>
                </div>
                <div className="mt-4">
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