import User from "../../models/User.js";

export async function scheduleBirthday(){
    console.log("finding birthday")
    const today = getTodayDate()
    try{
        const birthdayUsers = await User.findAll({
            attributes: ['userName', 'birthday'],
            where:{
                birthday: today
            }
        });
    }
    catch(err){
        console.log(err)
    }

}

const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); 
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    return `${day}/${month}`;
};