/* eslint-disable react/prop-types */
import{ useEffect, useState } from 'react'

const LoadingSpinner = ({ isLoading, style}) => {
    if(!style) style =''
    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    if(loading)
        return (
            <div className={`${style} flex -mt-10 md:mt-0 items-center justify-center h-screen w-full mb-[20rem]`}>
                <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
        );
}

export default LoadingSpinner