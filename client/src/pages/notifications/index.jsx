/* eslint-disable react/prop-types */
import { useQuery } from "react-query"
import Image from "../../components/containers/Image"
import { getAllNotifications } from "../../services/notification"
import { getMonthName } from "../../utils/DateFormatter"
import { customizeNotificationTime } from "../../utils/customizeNotificationTime"

const NotificationContainer = ({ openNotificationContainer }) => {
  const { data: notificationData, isLoading: notificationSummaryIsLoading } = useQuery('notifications', {
    queryFn: getAllNotifications
  })
  if (notificationSummaryIsLoading) console.log("Loading...")
  return (
    <section onClick={(e) => e.stopPropagation()} className={`w-[350px] h-[500px] ${!openNotificationContainer && 'hidden'} rounded-md shadow-md shadow-gray-400  z-50 bg-white overflow-x-visible right-1 md:right-10 fixed top-20  overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 `}>
      <h1 className="text-xl font-semibold mb-3">Notifications</h1>
      <div className="w-full">
        {
          notificationData && notificationData.data && notificationData.data.map((notification, index) => (
            <ul className="flex flex-col" key={index}>
              <li className=" font-semibold text-gray-600 text-sm">
                {getMonthName((Number(notification.month.substring(5, 7)) - 1).toString())}
              </li>
             {
              notification.notifications.map((not)=>{
                return(
                <li className="text-[0.75rem] inline-flex items-center gap-2" key={not.id}>
                <span><Image style={'rounded-full h-8 w-8 text-[0.5rem]'} /></span>{not.message}{not.message.lastIndexOf(".") == -1 && '.'} {customizeNotificationTime(not.createdAt)}
              </li>
              )})
             }
            </ul>
          ))
        }
      </div>
    </section>
  )
}

export default NotificationContainer