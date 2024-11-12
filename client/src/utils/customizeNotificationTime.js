export const customizeNotificationTime = (createdAt) =>{
  const timeDifference = new Date().getTime() - new Date(createdAt).getTime()
  const diffInSeconds= Math.floor(timeDifference / (1000));

  if(diffInSeconds < 60){
    return `${Math.floor(diffInSeconds)}s`
  }
  if(diffInSeconds > 60 && diffInSeconds < 3600){
    return `${Math.floor(diffInSeconds / 60)}m`
  }

  if(diffInSeconds > 3600 && diffInSeconds < 86400){
    return `${Math.floor(diffInSeconds / 3600)}h`
  }
  if(diffInSeconds < 604800){
    return `${Math.floor(diffInSeconds / 86400 )}d`
  }
 else{
    return `${Math.floor(diffInSeconds / (86400 * 7) )}w`
  }
}