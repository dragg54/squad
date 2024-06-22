/* eslint-disable react/prop-types */

const Image = ({source, style}) => {
  return (
    <div className={`rounded-full flex justify-center items-center overflow-hidden border border-gray-300 object-contain ${style}`}>
        <img className='full' src={source} alt='image'/>
    </div>
  )
}

export default Image