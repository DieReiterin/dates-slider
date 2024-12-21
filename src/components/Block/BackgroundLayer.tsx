import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

    &::before,
    &::after {
        content: '';
        position: absolute;
        background-color: #ccc;
    }

    &::before {
        top: 480px;
        left: 0;
        width: 100%;
        height: 1px;
    }

    &::after {
        top: 0;
        left: 50%;
        width: 1px;
        height: 100%;
        transform: translateX(-50%);
    }
`;

const Circle = styled.div`
    position: absolute;
    top: 215px;
    left: 50%;
    width: 530px;
    height: 530px;
    border: 1px solid #ccc;
    border-radius: 50%;
    transform: translateX(-50%);
`;

const BackgroundLayer: React.FC = () => {
    return (
        <Background>
            <Circle />
        </Background>
    );
};

export default BackgroundLayer;
