import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Text = styled.p`
    width: 360px;
    margin: 0 0 95px;
    padding-left: 75px;
    color: #42567a;
    font-size: 56px;
    line-height: 120%;
    font-weight: 700;
    word-wrap: break-word;
    border-left: 5px solid;
    border-image: linear-gradient(to bottom, #3877ee, #ef5da8) 1;
    border-image-slice: 1;
    @media (max-width: 1500px) {
        width: 50%;
        padding: 0;
        margin: 0 0 55px;
        font-size: 20px;
        border: none;
    }
`;

interface ITitleProps {
    children: ReactNode;
}

const Title: React.FC<ITitleProps> = ({ children }) => {
    return <Text>{children}</Text>;
};

export default Title;
