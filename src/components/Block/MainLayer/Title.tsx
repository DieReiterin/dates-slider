import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Text = styled.p`
    margin: 0 0 95px;
    padding-left: 75px;
    font-size: 56px;
    line-height: 120%;
    font-weight: 700;
    color: #42567a;
    width: 360px;
    word-wrap: break-word;
    border-left: 8px solid;
    border-image: linear-gradient(to bottom, #3877ee, #ef5da8) 1;
    border-image-slice: 1;
`;
// border: 1px solid black;

interface ITitleProps {
    children: ReactNode;
}

const Title: React.FC<ITitleProps> = ({ children }) => {
    return <Text>{children}</Text>;
};

export default Title;
