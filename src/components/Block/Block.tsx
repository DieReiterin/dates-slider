import React from 'react';
import styled from 'styled-components';
import BackgroundLayer from './BackgroundLayer';
import MainLayer from './MainLayer/MainLayer';

const BlockContainer = styled.div`
    position: relative;
    width: 1440px;
    height: 1080px;
    margin: 0 auto;
    background-color: #fff;
`;
// background-color: rgb(109, 109, 109);

const Block: React.FC = () => {
    return (
        <BlockContainer>
            <BackgroundLayer />
            <MainLayer />
        </BlockContainer>
    );
};

export default Block;
