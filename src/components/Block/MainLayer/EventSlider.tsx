import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { IEvent } from '@/types/types';

interface IEventSliderProps {
    events: IEvent[];
}

const SliderContainer = styled.div`
    width: 100%;
    height: 135px;
    display: flex;
    border: 2px solid red;
`;

const SlideContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    width: auto;
    height: 100%;
    border: 3px solid yellow;

    span {
        margin: 0 0 15px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 25px;
        line-height: 120%;
        color: #3877ee;
    }

    p {
        margin: 0;
        font-size: 20px;
        line-height: 30px;
        color: #42567a;
    }
`;

const NavBtnWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 100%;
`;

const NavBtn = styled.button<{ show: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 10px rgba(56, 119, 238, 0.4);
    cursor: pointer;
    opacity: ${({ show }) => (show ? '1' : '0')};
    transition: opacity 0.3s;

    svg {
        width: 8px;
        height: 16px;
    }
`;

const EventSlider: React.FC<IEventSliderProps> = ({ events }) => {
    const swiperRef = useRef<any>(null);
    const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    const [showPrevBtn, setShowPrevBtn] = useState(false);
    const [showNextBtn, setShowNextBtn] = useState(true);

    const updateBtnsVisibility = () => {
        setShowPrevBtn(!swiperRef.current?.isBeginning);
        setShowNextBtn(!swiperRef.current?.isEnd);
    };

    const handleBtnClick = (type: string) => {
        if (type === 'prev') {
            swiperRef.current?.slidePrev();
        } else {
            swiperRef.current?.slideNext();
        }
        updateBtnsVisibility();
    };

    const resizeSlides = () => {
        paragraphRefs.current.forEach((paragraph) => {
            if (paragraph) {
                if (paragraph.scrollHeight > 90) {
                    paragraph.style.width = '400px';
                } else {
                    paragraph.style.width = '320px';
                }
            }
        });
    };

    const scrollToStart = () => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0);
            updateBtnsVisibility();
        }
    };

    useEffect(() => {
        resizeSlides();
        scrollToStart();
    }, [events]);

    return (
        <SliderContainer>
            <NavBtnWrapper>
                <NavBtn
                    show={showPrevBtn}
                    onClick={() => {
                        handleBtnClick('prev');
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 12"
                        fill="none"
                    >
                        <path
                            d="M6 1L1 6L6 11"
                            stroke="#3877ee"
                            strokeWidth="2"
                        />
                    </svg>
                </NavBtn>
            </NavBtnWrapper>

            <Swiper
                slidesPerView="auto"
                spaceBetween={80}
                modules={[Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                // pagination={{ clickable: true }}
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                        <SlideContent>
                            <span>{event.year}</span>
                            <p
                                ref={(el) => {
                                    paragraphRefs.current[index] = el;
                                }}
                            >
                                {event.text}
                            </p>
                        </SlideContent>
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavBtnWrapper>
                <NavBtn
                    show={showNextBtn}
                    onClick={() => {
                        handleBtnClick('next');
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 12"
                        fill="none"
                    >
                        <path
                            d="M1 1L6 6L1 11"
                            stroke="#3877ee"
                            strokeWidth="2"
                        />
                    </svg>
                </NavBtn>
            </NavBtnWrapper>
        </SliderContainer>
    );
};

export default EventSlider;
