import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const RotatingCircle = styled.div`
    position: absolute;
    top: 215px;
    left: calc(50% - 265px);
    width: 530px;
    height: 530px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dot = styled.div<{ top: string; left: string; accented: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(${({ top }) => top} - 5px);
    left: calc(${({ left }) => left} - 5px);
    width: ${({ accented }) => (accented ? '55px' : '10px')};
    height: ${({ accented }) => (accented ? '55px' : '10px')};
    margin: ${({ accented }) => (accented ? '-22.5px;' : '0')};
    box-sizing: border-box;
    font-size: 24px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid rgba(48, 62, 88, 0.5);
    transition: width 0.5s ease, height 0.5s ease, margin 0.5s ease;
    &:hover {
        width: 55px;
        height: 55px;
        margin: -22.5px;
    }
    &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #000;
        border-radius: 50%;
        opacity: ${({ accented }) => (accented ? 0 : 1)};
    }
`;

// color: ${({ accented }) => (accented ? 'inherit' : 'transparent')};
//     background-color: ${({ accented }) => (accented ? '#fff' : 'transparent')};
//     border: ${({ accented }) =>
//         accented ? '1px solid rgba(48, 62, 88, 0.5)' : 'none'};
// transition: color 0.5s ease, background-color 0.5s ease, border 0.5s ease;

const calculateDotPositions = (count: number) => {
    const positions = [];
    const offsetAngle = Math.PI / 4;

    for (let i = 0; i < count; i++) {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2 + offsetAngle;
        const left = `calc(50% + ${Math.cos(angle) * 265}px)`;
        const top = `calc(50% + ${Math.sin(angle) * 265}px)`;
        const steps = (count - i) % count;
        positions.push({ number: i + 1, top, left, steps });
    }
    return positions;
};

interface CirclePointsProps {
    total: number;
    current: number;
    setPeriod: (number: number) => void;
}

const CirclePoints: React.FC<CirclePointsProps> = ({
    total,
    current,
    setPeriod,
}) => {
    const [points, setPoints] = useState(calculateDotPositions(total));
    const [activeIndex, setActiveIndex] = useState<number>(1);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const circleRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

    const currentRotation = useRef(0);

    const rotateAll = (steps: number) => {
        const oneStepAngle = 360 / total;

        const clockwiseSteps = steps;
        const counterClockwiseSteps = total - steps;

        const rotationAngle =
            clockwiseSteps <= counterClockwiseSteps
                ? clockwiseSteps * oneStepAngle
                : -counterClockwiseSteps * oneStepAngle;

        currentRotation.current += rotationAngle;

        gsap.to(circleRef.current, {
            rotate: currentRotation.current,
            duration: 1,
        });

        dotRefs.current.forEach((dot) => {
            if (dot) {
                gsap.to(dot, {
                    rotate: -currentRotation.current,
                    duration: 1,
                });
            }
        });
    };

    const handleDotUpdate = (newIndex: number) => {
        const newPoints = points.map((point, itemIndex) => {
            const steps =
                (total - ((itemIndex - newIndex + total) % total)) % total;
            return { ...point, steps };
        });

        setPoints(newPoints);

        const newActiveIndex = newPoints.findIndex(
            (point) => point.steps === 0
        );
        setActiveIndex(newActiveIndex);

        rotateAll(points[newIndex].steps);
    };

    const handleDotClick = (clickedIndex: number) => {
        handleDotUpdate(clickedIndex);

        setPeriod(points[clickedIndex].number);
    };

    useEffect(() => {
        if (current > 0 && current <= total) {
            handleDotUpdate(current - 1);
        }
    }, [current]);

    return (
        <RotatingCircle ref={circleRef}>
            {points.map((point, index) => (
                <Dot
                    key={point.number}
                    ref={(el: HTMLDivElement | null) => {
                        dotRefs.current[index] = el;
                    }}
                    top={point.top}
                    left={point.left}
                    accented={index === activeIndex || index === hoveredIndex}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleDotClick(index)}
                >
                    {index === activeIndex || index === hoveredIndex
                        ? point.number
                        : ''}
                    {/* : '•'} */}
                    {/* {point.number} */}
                </Dot>
            ))}
        </RotatingCircle>
    );
};

export default CirclePoints;
