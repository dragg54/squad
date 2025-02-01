/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Slider = ({
    imgs,
    autoplay,
    setActiveIndex,
    activeIndex,
    isImage,
    styles,
    width,
    height,
    shouldPaginate,
    handleSlideChange,
    sliderRef
}) => {
       if(!handleSlideChange)
         handleSlideChange = (swiper) => {
            setActiveIndex(swiper.activeIndex);
    }
    if(!styles){
        styles = {}
    }
    return (
        <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect={"creative"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={3}
            // loop={true} 
            autoplay={autoplay && {
                delay: 4000,
            }}
            ref={sliderRef}
            onSwiper={(swiper) => {
                if (sliderRef) sliderRef.current = swiper; 
            }}
            navigation
            onSlideChange={(swiper)=>handleSlideChange(swiper)}
            pagination={shouldPaginate && { clickable: false }}
            className="mySwiper"
            style={{...styles, width: width || '400px', height: height || '350px', display: 'flex', alignItems: 'center'}}
        >
            {imgs?.map((image, index) => (
                <SwiperSlide key={index} style={{ visibility: activeIndex === index ? 'visible' : 'hidden', height: 'full' }}>
                    {console.log(index)}
                    {isImage ? <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{ width: '300px', height: '300px'}}
                    /> : <div className='h-full flex items-center justify-center'>
                        {image}
                    </div>}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
