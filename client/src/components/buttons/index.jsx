/* eslint-disable react/prop-types */

import useDisableButton from "../../hooks/useDisabledButton";

const Button = ({
  name,
  icon,
  style,
  onClick,
  type,
  inputValues,
  validationRules,
  buttonDisabled,
  setButtonDisabled,
  response,
  isApiRequestButton
}) => {
  useDisableButton(inputValues, validationRules, buttonDisabled, setButtonDisabled);
  const requestProcessingName = "Please Wait"
  return (
    <button
      type={type || 'button'}
      disabled={(response == true && isApiRequestButton) || buttonDisabled == false ? false : false}
      onClick={onClick}
      className={`${style} ${buttonDisabled  ? '!bg-[#b19ff9] !cursor-default' : 'bg-[#9619b2] hover:bg-purple-400'}
      px-5 rounded-lg items-center py-2 flex justify-center text-sm gap-3 overflow-hidden font-semibold text-white`}>
      {(response && isApiRequestButton) ? name : !response && isApiRequestButton ? requestProcessingName : name} {icon}
    </button>
  )
}

export default Button