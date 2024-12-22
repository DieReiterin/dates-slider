import React from 'react';
import styled from 'styled-components';
import BackgroundLayer from './BackgroundLayer';
import MainLayer from './MainLayer/MainLayer';

const BlockContainer = styled.div`
    position: relative;
    width: 1440px;
    height: 1080px;
    margin: 0 auto 20px;
    background-color: #fff;
    @media (max-width: 1500px) {
        width: 320px;
    }
`;

const Block: React.FC = () => {
    return (
        <BlockContainer>
            <BackgroundLayer />
            <MainLayer />
        </BlockContainer>
    );
};

export default Block;
