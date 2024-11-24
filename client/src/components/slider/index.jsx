/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const UserAvatar = ({
    imgs,
    autoplay,
    setActiveIndex,
    activeIndex,
    isImage,
    width,
    height,
    shouldPaginate
}) => {

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
                delay: 4000,
            }}
            navigation
            onSlideChange={handleSlideChange}
            pagination={shouldPaginate && { clickable: false }}
            className="mySwiper"
            style={{ width: width || '400px', height, display: 'flex', alignItems: 'center'}}
        >
            {imgs?.map((image, index) => (
                <SwiperSlide key={index} style={{ visibility: activeIndex === index ? 'visible' : 'hidden', height: 'full' }}>
                    {isImage ? <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{ width: '300px', height: '300px', }}
                    /> : <div className='h-full flex items-center justify-center'>
                        {image}
                    </div>}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default UserAvatar;
