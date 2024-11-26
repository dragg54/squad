/* eslint-disable react/prop-types */

const Error = ({isRequestError, style, message}) => {
  const errorMessage = "Sorry, your request couldn't be completed. Please try again"
  return (
    <div className={`w-full bg-red-200 p-3 text-xs rounded-sm ${!isRequestError && 'hidden'}`} style={style}>
      <p>{message || errorMessage}</p>
    </div>
  )
}

export default Error