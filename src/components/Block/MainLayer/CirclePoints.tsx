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
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dot = styled.div<{ top: string; left: string }>`
    position: absolute;

    top: calc(${({ top }) => top} - 25px);
    left: calc(${({ left }) => left} - 25px);
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    padding-top: 10px;
    font-size: 24px;
    text-align: center;
    background-color: rgb(189, 189, 189);
    border-radius: 50%;
    cursor: pointer;
`;

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
                    onClick={() => handleDotClick(index)}
                >
                    {point.number}
                    {/* :: {point.steps} */}
                </Dot>
            ))}
        </RotatingCircle>
    );
};

export default CirclePoints;
