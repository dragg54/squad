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

const Navbar = ({ setMenuContainerOpened, setOpenNotificationContainer, openNotificationContainer }) => {

  const { data: notificationSummaryData, isLoading: isLoadingNotificationSummary, refetch } = useQuery('notificationSummary', {
    queryFn: getNotificationSummary
  })
  const user = useSelector(state => state.user)
  const notifications = useSelector(state => state.notification)
  const dispatch = useDispatch()
  if (!isLoadingNotificationSummary && notificationSummaryData && notificationSummaryData.unreadCount < 1) {
    dispatch(fetchNotifications({ notifications: notificationSummaryData }))
  }

  const readAllNotificationsMutation = useMutation(readAllNotifications, {
    onSuccess: () => {
      refetch()
      dispatch(readNotifications())
    },
    onError: (err) => console.log(err.message)
  })

  const handleReadAllNotifications = () => {
    readAllNotificationsMutation.mutate({ status: 'READ' })
  }
  if (!isLoadingNotificationSummary && notificationSummaryData) {
    dispatch(fetchNotifications({ data: notificationSummaryData?.data[0] }))
  }

  if (!useIgnoreMatchedPath())
    return (
      <div className={`w-full fixed z-40 md:h-20  h-20 border-b shadow-md shadow-gray-300 `}>
        <div className="absolute md:px-7 items-center w-full  p-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Image style="h-10 w-10" source={user.id == 5 ? 'avatars/kenny.jpg':'images/batman.jpg'} />
            <p className="font-semibold font-playwrite text-sm  text-gray-600">Hello, {user.firstName}</p>
          </div>
          <div className="flex text-2xl gap-3 items-center relative cursor-pointer" onClick={(e) => {
            e.stopPropagation()
            setOpenNotificationContainer(!openNotificationContainer)
            if (!openNotificationContainer) {
              handleReadAllNotifications()
            }
          }}>
            {/* < Button style="h-9 px-2 !text-xs bg-white text-purple-700 border border-purple-700" name={"Log out"} icon={<IoLogOutOutline style={{fontSize: "1.5rem"}}/>}/> */}
            <p className="cursor-pointer md:text-3xl"><IoNotificationsOutline className="cursor-pointer" /></p>
            < p className="cursor-pointer md:hidden" onClick={() => setMenuContainerOpened(true)}><IoMdMenu /></p>
            {notifications && notifications.unread > 0 && <p className="absolute md:top-1 md:right-1 left-2  bg-red-500 font-semibold rounded-full w-4 text-xs inline-flex justify-center items-center h-4 text-white p-1">
              {notifications.unread}
            </p>
            }
          </div>
        </div>
      </div>
    )
}

export default Navbar