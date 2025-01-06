import Slider from '../../components/slider'
import Button from '../../components/buttons';
import { useMutation, useQuery } from 'react-query'
import { getAvatars } from '../../services/avatar';
import { BACKEND_SERVER_URL } from '../../Appconfig';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { responseStatus } from '../../constants/ResponseStatus';
import { openPopup } from '../../redux/reducers/PopUpReducer';
import { useDispatch } from 'react-redux';
import { createUser } from '../../services/user';
import { saveUnverifiedUser } from '../../redux/reducers/UserReducer';


const UserAvatar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { data: avatars, isLoading: avatarsIsLoading } = useQuery('avatars', {
        queryFn: getAvatars
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useLocation().state
    if (avatarsIsLoading) {
        console.log("Loading...")
    }
    const createUserMutation = useMutation(createUser, {
        onSuccess: () => {
            navigate("/checkmail", {state: {username: state.input.userName}})
            dispatch(openPopup({ message: "User successfully created", status: responseStatus.success }))
        },
    });

    const handleSelectAvatar = () => {
        state.input = { ...state.input, profileAvatar: avatars[activeIndex], squadId: 1 }
        createUserMutation.mutate(state.input)
        dispatch(saveUnverifiedUser({userDetails:{...state.input}}))
    }

    const avatarImgs = avatars?.map(avatar => (
        BACKEND_SERVER_URL + "/avatars/" + avatar
    ))

    return (
        <div className='flex items-center flex-col md:mt-28 mt-32'>
            <h1 className='text-2xl md:text-4xl font-bold mb-4'>Choose Your Avatar</h1>
            <Slider shouldPaginate={true} isImage={true} imgs={avatarImgs} autoplay={false} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
            <div className='flex gap-2 mt-2'>
            <Button type={'button'} onClick={() => navigate("/login")} name='Skip' style={'!border w-36 !border-purple-500 !rounded-full !bg-purple-700 !text-white hover:!bg-purple-400 hover:border-2'} />
            <Button type={'button'} onClick={() => handleSelectAvatar()} name='Select Avatar' style={'!border w-36 !border-purple-500 !rounded-full !bg-white !text-purple-500 hover:!bg-purple-100 hover:border-2'} />
            </div>
        </div>
    );
};

export default UserAvatar;
