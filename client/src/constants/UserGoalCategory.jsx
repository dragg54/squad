import { faCoins, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdCastForEducation } from "react-icons/md";
import { IoIosNutrition } from "react-icons/io";
import { FaBusinessTime } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { GiLifeInTheBalance } from "react-icons/gi";
import { GiRelationshipBounds } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiGrowth } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import { GiHolySymbol } from "react-icons/gi";
import { BiHealth } from "react-icons/bi";
import { BsFillHousesFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";


export const userGoalCategoryConstant = [
    {
        categoryName: "Finance",
        categoryIcon: <FontAwesomeIcon icon={faCoins}/>

    },
    {
        categoryName: "Entertainment",
        categoryIcon: <FontAwesomeIcon icon={faMusic} />
    },
    {
        categoryName: "Education",
        categoryIcon: <MdCastForEducation />
    },
    {
        categoryName: "Fitness and Nutrition",
        categoryIcon: <IoIosNutrition />
    },
    {
        categoryName: "Enterpreneurship",
        categoryIcon: <IoBusinessOutline />
    },
    {
        categoryName: "Lifestyle",
        categoryIcon: <GiLifeInTheBalance />
    },
    {
        categoryName: "Relationship and Marriage",
        categoryIcon: <GiRelationshipBounds />
    },
    {
        categoryName: "Properties and Ownership",
        categoryIcon: <BsFillHousesFill />
    },
    {
        categoryName: "Business and Entrepreneurship",
        categoryIcon: <FaBusinessTime />
    },
    {
        categoryName: "Socialization",
        categoryIcon: <FaPeopleGroup />
    },
    {
        categoryName: "Personal Development",
        categoryIcon: <GiGrowth />
    },
    {
        categoryName: "Family and Friends",
        categoryIcon: <GiThreeFriends />
    },
    {
        categoryName: "Religion and Spirituality",
        categoryIcon: <GiHolySymbol />
    },
    {
        categoryName: "Health",
        categoryIcon: <BiHealth />
    },
    {
        categoryName: "Group",
        categoryIcon: <GrGroup />
    },
]