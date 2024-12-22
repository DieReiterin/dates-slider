import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const Topic = styled.div`
    position: absolute;
    top: 20px;
    left: calc(100% - 90px);
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 1500px) {
        display: none;
    }
`;

const TopicName: React.FC<{ text: string }> = ({ text }) => {
    const [currentTopic, setCurrentTopic] = useState(text);
    const topicRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (topicRef.current) {
            gsap.to(topicRef.current, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    setCurrentTopic(text);
                    gsap.to(topicRef.current, { opacity: 1, duration: 0.5 });
                },
            });
        }
    }, [text]);

    return <Topic ref={topicRef}>{currentTopic}</Topic>;
};

export default TopicName;
