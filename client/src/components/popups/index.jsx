/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { closePopup } from "../../redux/reducers/PopUpReducer";
import PropTypes from 'prop-types';
import { status } from "../../constants/ResponseStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const PopUp = ({ autoCloseDuration = 3000 }) => {
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
    <div className="p-2 z-50 fixed bg-white text-sm border border-gray-200 right-2 shadow shadow-gray-300 mt-1">
      <p className={popup?.content?.status === status.error ? 'text-red-500 inline-flex gap-8 items-center' : ''}>
        {popup?.content?.message}
        {popup?.content?.status == status.success && <FontAwesomeIcon icon={faCircleCheck} style={{color: "green", fontSize: "17px", marginLeft:"5px", marginTop:"2px"}}/>}
        {popup?.content?.status == status.error && <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "red", fontSize: "17px", marginLeft:"5px", marginTop:"2px"}}/>}
      </p>
    </div>
  );
};

PopUp.propTypes = {
  autoCloseDuration: PropTypes.number
};

export default PopUp;
