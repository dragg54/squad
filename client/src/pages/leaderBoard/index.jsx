import { useSelector } from "react-redux"
import Image from "../../components/containers/Image"
import { getPoints } from "../../services/point"
import PointBox from "./components/PointBox"
import UserBox from "./components/UserBox"
import { useQuery } from "react-query"

const LeaderBoard = () => {
    const user = useSelector(state => state.user)
    const {data, isLoading, isError} = useQuery({
        queryFn: getPoints
    })

    if(!isLoading){
    console.log(data)
}

if(isError){
    console.log("error...")
}
    return (
        <section className="w-full  h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">
            <h1 className="text-2xl font-bold mb-8">Leaderboard</h1>
            {/* <div className="w-40 h-80 bg-purple-500">

        </div> */}
           <UserBox {...{isCurrentUser: true, userPointData: data && data.find(pointData => pointData.userId ==  user.id), position: data && data.findIndex(pointData => pointData.userId ==  user.id)+1}}/>
            <div className="w-full flex h-100 mt-12 md:ml-10 items-end">
                <div className="flex flex-col w-60 items-center relative">
                    <Image source='avatars/kenny.jpg' style="mb-4 h-20 w-20 rounded-full bg-yellow-500" />
                    <PointBox {...{ background: "bg-blue-500", points: data && data[1]?.points }} />
                    <p className="text-[0.5rem] md:text-xs mb-3">{data && data[1]?.user?.userName}
                    </p>
                    <div className=" w-[131px] h-12 bg-blue-500 clip-trapezoid text-white border border-blue-700  shadow-md shadow-blue-500"></div>

                    <div className="ml-1 w-40 flex justify-center items-center h-52 bg-blue-500 clip-trapezoid text-white border">
                        <p className="text-6xl text-white font-bold">2</p>
                    </div>
                </div>
                <div className="flex flex-col w-60 items-center relative -ml-12 md:-ml-24 z-40">
                    <Image source='avatars/av2.jpg' style="mb-4 h-20 w-20 rounded-full bg-yellow-500" />
                    <PointBox {...{ background: "bg-purple-700", points:  data && data[0]?.points }} />
                    <p className="text-[0.5rem] md:text-xs mb-3">{data && data[0]?.user?.userName}
                    </p>
                    <div className=" w-[131px] h-12 bg-purple-500 clip-trapezoid text-white border border-purple-700  shadow-md shadow-purple-500"></div>
                    <div className="ml-1 w-40 h-72 bg-purple-500 clip-trapezoid text-white border flex items-center justify-center">
                        <p className="text-6xl text-white font-bold">1</p>
                    </div>
                </div>
                <div className="flex flex-col w-60 items-center relative -ml-12 md:-ml-24">
                    <Image source='avatars/av1.jpg' style="mb-4 h-20 w-20 rounded-full bg-yellow-500" />
                    <PointBox {...{ background: "bg-green-500", points: data && data[2]?.points }} />
                    <p className="text-[0.5rem] md:text-xs mb-3">{data && data[2]?.user?.userName}
                    </p>
                    <div className=" w-[131px] h-12 bg-green-500 clip-trapezoid text-white border border-green-700  shadow-md shadow-green-500"></div>
                    <div className="ml-1 w-40 flex justify-center items-center h-52 bg-green-500 clip-trapezoid text-white border">
                        <p className="text-6xl text-white font-bold">3</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                {
                    data && data.length > 0 && data.slice(3, data.length).map((userPointData, index) => (<UserBox  key={userPointData.id} {...{position:index+ 4, isCurrentUser: user.id == userPointData.userId, userPointData: userPointData}}/>
                    ))
                }
            </div>
        </section>
    )
}

export default LeaderBoard