/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import Image from "../containers/Image";
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchPath";
import { useMutation, useQuery } from "react-query";
import { getNotificationSummary, readAllNotifications } from "../../services/notification";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, readNotifications } from "../../redux/reducers/NotificationReducer";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setMenuContainerOpened, setOpenNotificationContainer, openNotificationContainer, openUserContainer, setOpenUserContainer }) => {

  const { data: notificationSummaryData, isLoading: isLoadingNotificationSummary, refetch } = useQuery('notificationSummary', {
    queryFn: getNotificationSummary
  })
  // const user = useSelector(state => state.user)
  const notifications = useSelector(state => state.notification)
  const dispatch = useDispatch()
  if (!isLoadingNotificationSummary && notificationSummaryData) {
    dispatch(fetchNotifications({ data: notificationSummaryData.data[0] }))
  }
  const user = useSelector(state => state.user)
  const readAllNotificationsMutation = useMutation(readAllNotifications, {
    onSuccess: () => {
      refetch()
    },
    onError: (err) => console.log(err.message)
  })
  const navigate = useNavigate()
  const handleReadAllNotifications = () => {
    dispatch(readNotifications())
    readAllNotificationsMutation.mutate({ status: 'READ' })
  }
  // if (!isLoadingNotificationSummary && notificationSummaryData && !notifications.hasLoaded) {
  //   dispatch(fetchNotifications({ data: notificationSummaryData }))
  // }
  if (!useIgnoreMatchedPath())
    return (
      <div className={`w-full fixed z-40 md:h-20   h-20 border-b shadow-md shadow-gray-300 `}>
        <div className="absolute md:px-7 items-center w-full  p-4 flex justify-between">
          {/*  */}
          <img src="/logo/logo.jpg" alt="" className="h-full w-[40px]"/>
          <p className="font-sourGummy !text-purple-900 font-semibold mr-auto ml-2 text-xl cursor-pointer" onClick={() => {
            navigate("/home")
          }}>Momentom</p>
          <div className="flex text-2xl gap-3 items-center relative cursor-pointer" onClick={(e) => {
            e.stopPropagation()
            setOpenNotificationContainer(!openNotificationContainer)
            setOpenUserContainer(false)
            if (!openNotificationContainer) {
              handleReadAllNotifications()
            }
          }}>
            <div onClick={(e) => {
              e.stopPropagation()
              setOpenUserContainer(!openUserContainer)
              setOpenNotificationContainer(false)
            }}>
              <Image hasNavigated={true} userId={user.id} isUser={true} style="h-10 w-10" source={user.profileAvatar} />
            </div>
            <p className="cursor-pointer md:text-3xl"><IoNotificationsOutline className="cursor-pointer" /></p>
            < p className="cursor-pointer md:hidden" onClick={(e) => {
              e.stopPropagation()
              setOpenNotificationContainer(false)
              setOpenUserContainer(false)
              setMenuContainerOpened(true)
            }}><IoMdMenu /></p>
            {notifications && notifications.unread > 0 && <p className="absolute md:top-1 top-2 md:right-1 md:left-16 left-16 z-40 bg-red-700 font-semibold rounded-full w-4 text-xs inline-flex justify-center items-center h-4 text-white p-1">
              {notifications.unread}
            </p>
            }
          </div>
        </div>
      </div>
    )
}

export default Navbar