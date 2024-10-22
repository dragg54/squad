import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/reducers/GlobalModalReducer"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

// eslint-disable-next-line react/prop-types
const GlobalModal = () => {
  const dispatch = useDispatch()
  const globalModal = useSelector(state => state.globalModal)
  const location = useLocation();

  // Close the modal when the route changes
  useEffect(() => {
    dispatch(closeModal());
  }, [location]);

  return (
    <div onClick={() => {
      dispatch(closeModal())
    }} className={`w-screen h-screen z-50 overflow-hidden bg-modal ${globalModal.isOpen && globalModal.content?.component ? 'flex' : 'hidden'} items-start pt-28 md:pt-40 justify-center  fixed `}>
      {globalModal?.content?.component}
    </div>
  )
}

export default GlobalModal