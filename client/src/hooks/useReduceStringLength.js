/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";


const useReduceStringLength = (text) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
           const handleScreenWidth =() =>{
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            if (mobile) {
                setDisplayText(text.length > 14 ? text.slice(0, 20) + '...' : text); 
            } else {
                setDisplayText(text); 
            }
           }
           handleScreenWidth()
           window.addEventListener('resize', handleScreenWidth);
            return () => window.removeEventListener('resize', handleScreenWidth);
    },[text])
    return displayText
}

export default useReduceStringLength