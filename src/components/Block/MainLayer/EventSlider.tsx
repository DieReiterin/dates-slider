import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { IEvent } from '@/types/types';
interface IEventSliderProps {
    events: IEvent[];
}

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 135px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    border: 2px solid red;
`;

const NavigationButton = styled.button<{
    position: 'left' | 'right';
    isHidden: boolean;
}>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    opacity: ${({ isHidden }) => (isHidden ? '0' : '1')};
    visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
    transition: opacity 0.3s;

    ${({ position }) => (position === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const SlideItem = styled.div<{ isCenter: boolean }>`
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f7f7f7;
    padding: 15px;
    margin-right: 80px;
    box-shadow: ${({ isCenter }) =>
        isCenter ? '0px 4px 8px rgba(0,0,0,0.2)' : 'none'};
    width: ${({ isCenter }) => (isCenter ? '400px' : '320px')};
    border-radius: 8px;

    h3 {
        margin: 0;
        font-size: 20px;
        color: ${({ isCenter }) => (isCenter ? '#000' : '#555')};
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #777;
    }
`;

const EventSlider: React.FC<IEventSliderProps> = ({ events }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const isPrevHidden = currentSlide === 0;
    const isNextHidden = currentSlide === events.length - 1;

    return (
        <SliderContainer>
            <NavigationButton
                position="left"
                isHidden={isPrevHidden}
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            >
                &#8592;
            </NavigationButton>

            <Swiper
                slidesPerView={3}
                spaceBetween={80}
                centeredSlides={true}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                navigation={true}
                modules={[Navigation]}
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        <SlideItem isCenter={index === currentSlide}>
                            <h3>{event.year}</h3>
                            <p>{event.text}</p>
                        </SlideItem>
                    </SwiperSlide>
                ))}
            </Swiper>

            <NavigationButton
                position="right"
                isHidden={isNextHidden}
                onClick={() =>
                    setCurrentSlide((prev) =>
                        Math.min(prev + 1, events.length - 1)
                    )
                }
            >
                &#8594;
            </NavigationButton>
        </SliderContainer>
    );
};

export default EventSlider;
