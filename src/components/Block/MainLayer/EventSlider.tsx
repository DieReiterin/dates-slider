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

const SliderContainer = styled.div<{ isFading: boolean }>`
    width: 100%;
    display: flex;
    opacity: ${({ isFading }) => (isFading ? 0 : 1)};
    transition: opacity 0.5s ease;

    .swiper-slide {
        padding-right: 80px;
    }

    .swiper-pagination {
        display: none;
    }

    @media (max-width: 1500px) {
        .swiper {
            padding: 0 113px 105px 0;
        }

        .swiper-slide {
            opacity: 0.5;
            padding-right: 20px;
        }

        .swiper-slide-active {
            opacity: 1;
        }

        .swiper-pagination {
            display: block;
            top: auto;
            bottom: 20px;
        }
    }
`;

const NavBtnWrapper = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;

    @media (max-width: 1500px) {
        display: none;
    }
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

const SlideContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    width: auto;
    min-height: 135px;

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

    @media (max-width: 1500px) {
        min-height: 115px;

        span {
            font-size: 16px;
            line-height: 120%;
        }

        p {
            font-size: 14px;
            line-height: 145%;
        }
    }
`;

const EventSlider: React.FC<IEventSliderProps> = ({ events }) => {
    const swiperRef = useRef<any>(null);
    const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    const [currentEvents, setCurrentEvents] = useState(events);
    const [isFading, setIsFading] = useState(false);
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
                if (window.innerWidth <= 1500) {
                    paragraph.style.width = '165px';
                } else {
                    paragraph.style.width =
                        paragraph.scrollHeight > 90 ? '400px' : '320px';
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
        window.addEventListener('resize', resizeSlides);

        return () => {
            window.removeEventListener('resize', resizeSlides);
        };
    }, []);

    useEffect(() => {
        setIsFading(true);
        const timer = setTimeout(() => {
            setCurrentEvents(events);
            setIsFading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [events]);

    useEffect(() => {
        resizeSlides();
        scrollToStart();
        swiperRef.current?.update();
    }, [currentEvents]);

    return (
        <SliderContainer isFading={isFading}>
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
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={updateBtnsVisibility}
                modules={[Pagination]}
                pagination={{ clickable: true }}
            >
                {currentEvents.map((event, index) => (
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
