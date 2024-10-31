import { useLocation } from 'react-router-dom'

export const useIgnoreMatchedPath = () => {
    const location = useLocation()
    const url = location.pathname
    const pathsToIgnore = ["intro", "login", "register"]
    return pathsToIgnore.some(pattern => url.includes(pattern));
}
