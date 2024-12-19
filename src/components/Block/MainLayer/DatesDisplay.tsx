import React from 'react';
import styled from 'styled-components';

const StyledDatesDisplay = styled.div`
    display: flex;
    margin: 0 auto 135px;
    h2 {
        margin: 0 20px;
        font-size: 200px;
        font-weight: 700;
        line-height: 160px;
        color: rgba(93, 95, 239, 0.8);
    }

    h2.red {
        color: rgba(239, 93, 168, 0.8);
    }
`;

interface IDatesDisplayProps {
    children: React.ReactNode;
}

const DatesDisplay: React.FC<IDatesDisplayProps> = ({ children }) => {
    return <StyledDatesDisplay>{children}</StyledDatesDisplay>;
};

export default DatesDisplay;
