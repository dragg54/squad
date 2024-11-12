/* eslint-disable react/prop-types */
const PointBox = ({ background, points }) => {
    return (
        <div className={`${background} w-16 h-6 text-white rounded-md mb-1 text-xs font-semibold flex items-center justify-center`}>
            {points} PT
        </div>
    )
}

export default PointBox