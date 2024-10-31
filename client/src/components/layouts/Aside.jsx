import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchPath"
import Button from "../buttons"
import Image from "../containers/Image"

const Aside = () => {
    if(!useIgnoreMatchedPath())
    return (
        <div className='hidden md:flex flex-col w-[300px]  h-screen shadow-l shadow-md shadow-gray-400 justify-start p-8 px-5'>
            <div>
                <h1 className="font-bold text-xl w-full p-2 shadow-sm rounded-sm !text-gray-400">Latest Members</h1>
                <ul className="mt-4 text-sm">
                    <li className="flex gap-2 items-center">
                        <Image style="rounded-full h-14 w-14"/>
                        Kelvin Joe
                    </li>
                    <li className="flex gap-2 items-center">
                        <Image style="rounded-full h-14 w-14"/>
                        Akeem Zola
                    </li>
                    <li className="flex gap-2 items-center">
                        <Image style="rounded-full h-14 w-14"/>
                        Joseph Yobo
                    </li>
                </ul>
                <Button name='Load More' style='!bg-white !border-purple'/>
            </div>
            <div className="text-sm flex-col gap-3">
                <h1 className="font-bold text-xl w-full  shadow-sm rounded-sm pb-2 text-[#189ab4]">Trending Posts</h1>
                <ul className="mt-4 flex flex-col gap-2">
                    <li className="flex items-start justify-center flex-col">
                        <p className="">The main thing {"I'm "}wondering </p>
                        <p className="text-gray-500 text-xs">By Tolu </p>
                    </li>
                    <li className="flex items-start justify-center flex-col">
                        <p className="">How to be successful in your business </p>
                        <p className="text-gray-500 text-xs">By Tolu </p>
                    </li>
                    <li className="flex items-start justify-center flex-col">
                        <p className="">Getting paid in dollars</p>
                        <p className="text-gray-500 text-xs">By Tolu </p>
                    </li>
                </ul>
                <Button name='Load More' style='!bg-white !border-purple'/>
            </div>
        </div>
    )
}

export default Aside