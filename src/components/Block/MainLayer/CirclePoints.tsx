//     top: calc(50% - 187.5px); /* 265px * cos(45°) */
//     left: calc(50% + 187.5px); /* 265px * sin(45°) */

import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const rotateBack = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
`;

const RotatingCircle = styled.div<{ isRotating: boolean }>`
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
    ${({ isRotating }) =>
        isRotating &&
        css`
            animation: ${rotate} 5s linear infinite;
        `}
`;

const Dot = styled.div<{ top: string; left: string; isRotating: boolean }>`
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
    ${({ isRotating }) =>
        isRotating &&
        css`
            animation: ${rotateBack} 5s linear infinite;
        `}
`;

const calculateDotPositions = (count: number) => {
    const positions = [];
    const offsetAngle = Math.PI / 4;

    for (let i = 0; i < count; i++) {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2 + offsetAngle;
        const left = `calc(50% + ${Math.cos(angle) * 265}px)`;
        const top = `calc(50% + ${Math.sin(angle) * 265}px)`;
        positions.push({ number: i + 1, top, left });
    }
    return positions;
};

const CirclePoints: React.FC<{ total: number }> = ({ total }) => {
    const [isRotating, setIsRotating] = useState(false);
    const points = calculateDotPositions(6);

    const handleDotClick = () => {
        setIsRotating(!isRotating);
    };

    return (
        <RotatingCircle isRotating={isRotating}>
            {points.map((point) => (
                <Dot
                    key={point.number}
                    top={point.top}
                    left={point.left}
                    onClick={handleDotClick}
                    isRotating={isRotating}
                >
                    {point.number}
                </Dot>
            ))}
        </RotatingCircle>
    );
};

export default CirclePoints;
