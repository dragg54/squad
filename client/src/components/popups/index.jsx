/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { closePopup } from "../../redux/reducers/PopUpReducer";
import PropTypes from 'prop-types';
import { responseStatus } from "../../constants/ResponseStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const PopUp = ({ autoCloseDuration = 3000, style }) => {
  const popup = useSelector(state => state.popup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popup.isOpen) {
      const timer = setTimeout(() => {
        dispatch(closePopup());
      }, autoCloseDuration);
      
      return () => clearTimeout(timer); 
    }
  }, [popup, dispatch, autoCloseDuration]);

  if (!popup.isOpen) return null;

  return (
    <div  className={`${style} p-2 z-50 fixed bg-white text-sm border border-gray-200 right-2 shadow shadow-gray-300 mt-1`}>
      <p className={popup?.content?.status === responseStatus.error ? 'text-red-500 inline-flex gap-8 items-center' : ''}>
        {popup?.content?.message}
        {popup?.content?.status == responseStatus.success && <FontAwesomeIcon icon={faCircleCheck} style={{color: "green", fontSize: "17px", marginLeft:"5px", marginTop:"2px"}}/>}
        {popup?.content?.status == responseStatus.error && <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "red", fontSize: "17px", marginLeft:"5px", marginTop:"2px"}}/>}
      </p>
    </div>
  );
};

PopUp.propTypes = {
  autoCloseDuration: PropTypes.number
};

export default PopUp;
