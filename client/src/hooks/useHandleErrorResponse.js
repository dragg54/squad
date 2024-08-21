import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openPopup } from '../redux/reducers/PopUpReducer';
import { closeModal } from '../redux/reducers/GlobalModalReducer';

const useHandleErrorResponse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (statusCode) => {
        switch (statusCode) {
            case 400:
                dispatch(openPopup({ status: 'error', message: 'Bad Request: The server could not understand the request.' }));
                break;
            case 401:
                dispatch(closeModal())
                navigate('/login');
                break;
            case 403:
                dispatch(openPopup({ status: 'error', message: 'Forbidden: You do not have permission to access this resource.' }));
                break;
            case 404:
                dispatch(openPopup({ status: 'error', message: 'Not Found: The requested resource could not be found.' }));
                break;
            case 500:
                dispatch(openPopup({ status: 'error', message: 'Internal Server Error: An error occurred on the server. Please try again later.' }));
                break;
            case 502:
                dispatch(openPopup({ status: 'error', message: 'Bad Gateway: The server received an invalid response from the upstream server.' }));
                break;
            case 503:
                dispatch(openPopup({ status: 'error', message: 'Service Unavailable: The server is currently unavailable. Please try again later.' }));
                break;
            case 504:
                dispatch(openPopup({ status: 'error', message: 'Gateway Timeout: The server took too long to respond. Please try again later.' }));
                break;
            default:
                dispatch(openPopup({ status: 'error', message: 'An unexpected error occurred. Please try again.' }));
                break;
        }
    };
};

export default useHandleErrorResponse;
