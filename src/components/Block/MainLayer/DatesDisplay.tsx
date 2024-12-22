import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDatesDisplay = styled.div`
    display: flex;
    margin: 0 auto 135px;

    h2 {
        margin: 0 20px 0 0;
        font-size: 200px;
        font-weight: 700;
        line-height: 160px;
        color: rgba(93, 95, 239, 0.8);
    }

    h2.red {
        margin: 0 0 0 20px;
        color: rgba(239, 93, 168, 0.8);
    }
    @media (max-width: 1500px) {
        width: 280px;
        justify-content: space-between;
        margin: 0 0 20px;
        padding: 0 0 60px;
        border: 1px solid red;
        border-bottom: 1px solid #c7cdd9;

        h2 {
            margin: 0;
            font-size: 56px;
            line-height: 72px;
        }
    }
`;

interface IDatesDisplayProps {
    startYear: number;
    endYear: number;
}

const DatesDisplay: React.FC<IDatesDisplayProps> = ({ startYear, endYear }) => {
    const [displayedStartYear, setDisplayedStartYear] = useState(startYear);
    const [displayedEndYear, setDisplayedEndYear] = useState(endYear);

    useEffect(() => {
        const duration = 900; // Общая длительность анимации в миллисекундах
        const intervalTime = 50; // Интервал между шагами (меньше = более плавно)
        const steps = Math.floor(duration / intervalTime); // Количество шагов

        const startYearStep = (startYear - displayedStartYear) / steps;
        const endYearStep = (endYear - displayedEndYear) / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setDisplayedStartYear((prev) => prev + startYearStep);
            setDisplayedEndYear((prev) => prev + endYearStep);

            if (currentStep >= steps) {
                clearInterval(interval);
                setDisplayedStartYear(startYear);
                setDisplayedEndYear(endYear);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [startYear, endYear]);

    return (
        <StyledDatesDisplay>
            <h2>{Math.round(displayedStartYear)}</h2>
            <h2 className="red">{Math.round(displayedEndYear)}</h2>
        </StyledDatesDisplay>
    );
};

export default DatesDisplay;
