/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const UserAvatar = ({imgs, autoplay, setActiveIndex, activeIndex}) => {

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };
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
                delay: 2000, 
            }}
            
            navigation
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }} 
            className="mySwiperContainer mySwiper"
            style={{width:"400px"}}
        >
            {imgs?.map((image, index) => (
                <SwiperSlide key={index} style={{ visibility: activeIndex === index ? 'visible' : 'hidden' }}>
                    <img 
                        src={image} 
                        alt={`Slide ${index + 1}`} 
                        style={{ width: '300px', height: '300px',  }} 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default UserAvatar;
