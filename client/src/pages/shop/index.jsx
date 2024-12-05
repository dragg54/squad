import DescriptionBox from "./components/DescriptionBox"
import { BiSolidCoinStack } from "react-icons/bi";
import ItemAndCategory from "./components/ItemAndCategory";
import itemCategories from "./temps/tempItemCategories.json"

const Shop = () => {
    return (
        <section className="w-full  h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[15rem] pb-20">
            <div className="flex justify-between items-center md:w-[70%]">
                <div>
                    <h1 className="font-semibold text-xl">{"Tom's"} Shop</h1>
                    <small className="text-gray-500">Trade your points for exciting goodies</small>
                </div>
                <h1 className="font-bold text-2xl px-2 py-1 inline-flex rounded-full items-center bg-gray-100"><BiSolidCoinStack /> 100GP</h1>
            </div>
            <div className="mt-5 md:w-[70%] flex justify-between gap-2 w-full">
                <DescriptionBox
                    text={{
                        primaryText: "Points for collectibles",
                        secondaryText: "Spend your points on fancy items "

                    }}
                    image={'/images/trade.png'} />
                <DescriptionBox
                    text={{
                        primaryText: "Boost your experience",
                        secondaryText: "Buy features to boost your experience on the app"
                    }}
                    image={'/images/feature_boost.png'} />
            </div>
            <div className="w-full md:w-[70%]">
                {
                    itemCategories.map((itemCategory)=>(
                        <ItemAndCategory itemCategory={itemCategory} key={itemCategory.id}/>
                    ))
                }
            </div>
        </section>
    )
}

export default Shop