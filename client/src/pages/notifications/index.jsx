/* eslint-disable react/prop-types */
import { useQuery } from "react-query"
import Image from "../../components/containers/Image"
import { getAllNotifications } from "../../services/notification"
import { getMonthName } from "../../utils/DateFormatter"
import { customizeNotificationTime } from "../../utils/customizeNotificationTime"
import { BACKEND_SERVER_URL } from "../../Appconfig"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { MdOutlineDangerous } from "react-icons/md";

const NotificationContainer = ({ openNotificationContainer }) => {
  const { data: notificationData, isLoading: notificationSummaryIsLoading } = useQuery('notifications', {
    queryFn: getAllNotifications
  })
  const navigate = useNavigate()
  const gotoSource = (sourceId, sourceName) => {
    navigate(`/${sourceName?.toLowerCase()}/${sourceId}`)
  }
  if (notificationData && notificationData.data < 1) {
    return (
      <section className={`md:w-[300px] pb-3  flex justify-center flex-col items-center md:max-h-[400px] w-[200px] max-h-[300px] ${!openNotificationContainer && 'hidden'} rounded-md shadow-md shadow-gray-400  z-50 bg-white overflow-x-visible right-1 md:right-10 fixed top-20  overflow-y-scroll p-4 md:p-8 pb-10 md:pb-8 `}>
        <img src="/images/notification.jpg" className="h-28 mx-auto w-32" />
        <p className="mt-2 text-gray-500 font-semibold">No Notification Yet</p>
      </section>
    )
  }
  return (
    <section className={`md:w-[300px]  md:max-h-[400px] w-3/5 max-h-[300px] ${!openNotificationContainer && 'hidden'} rounded-md shadow-md shadow-gray-400  z-50 bg-white overflow-x-visible right-1 md:right-10 fixed top-20  overflow-y-scroll p-4 md:p-8 pb-10 md:pb-8 `}>
      {
        notificationSummaryIsLoading ?
          <div className="flex flex-col items-center justify-start pt-3 h-24 gap-4 w-full">
            <h1 className="text-xl font-semibold mb-3">Notifications</h1>
            <LoadingSpinner isLoading={notificationSummaryIsLoading} style='!w-full !h-10 mt-20' />
          </div>
          :
          <div className="w-full h-full ">
            <h1 className="text-xl font-semibold mb-3">Notifications</h1>
            <div className="w-full">
              {
                notificationData && notificationData.data && notificationData.data.map((notification, index) => (
                  <ul className="flex flex-col" key={index}>
                    <li className=" font-semibold text-gray-600 text-sm">
                      {getMonthName((Number(notification.month.substring(5, 7)) - 1).toString())}
                    </li>
                    {
                      notification.notifications.map((not) => {
                        return (
                          <li className="text-[0.85rem] inline-flex items-center gap-2" key={not.id} onClick={() => {
                            gotoSource(not["notification_sources.sourceId"], not["notification_sources.sourceName"])
                          }}>
                            {console.log((not["notification_sources.sourceName"]))}
                            <span>
                              {
                                  ['USER', 'POST', 'BIRTHDAY'].includes(not["notification_sources.sourceName"]) 
                                           ? <Image source={BACKEND_SERVER_URL + "/avatars/" + not?.['user.profileAvatar']} style={'rounded-full h-8 w-8 text-[0.5rem]'}/>
                                           : (not["notification_sources.sourceName"] == "GOALEXPIRATION") ? 
                                          <MdOutlineDangerous className="text-red-600 text-2xl"/>: ''
                                          }</ span>{not.message}{not.message.lastIndexOf(".") == -1 && '.'} {customizeNotificationTime(not.createdAt)}
                          </li>
                        )
                      })
                    } 
                  </ul>
                ))
              }
            </div>
          </div>
      }

    </section>
  )
}

export default NotificationContainer