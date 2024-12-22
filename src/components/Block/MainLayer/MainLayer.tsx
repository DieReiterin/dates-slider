import React, { useState } from 'react';
import styled from 'styled-components';

import Title from './Title';
import DatesDisplay from './DatesDisplay';
import CirclePoints from './CirclePoints';
import Counter from './Counter';
import EventSlider from './EventSlider';

import { timePeriods } from '@/constants/timePeriods';
import { ITimePeriod } from '@/types/types';

const Layer = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 170px 0 0;

    @media (max-width: 1500px) {
        padding: 60px 0 0 20px;
    }
`;

const MainLayer: React.FC = () => {
    const [activePeriodIndex, setActivePeriodIndex] = useState(0);
    const activePeriod: ITimePeriod = timePeriods[activePeriodIndex];

    const handleYearChange = (newValue: number) => {
        if (newValue < 1 || newValue > timePeriods.length) {
            return;
        }
        const newIndex = newValue - 1;
        setActivePeriodIndex(newIndex);
    };
    return (
        <Layer>
            <Title>Исторические даты</Title>
            <DatesDisplay
                startYear={activePeriod.startYear}
                endYear={activePeriod.endYear}
            />
            <CirclePoints
                current={activePeriodIndex + 1}
                total={timePeriods.length}
                setPeriod={handleYearChange}
                topicName={activePeriod.topic}
            />
            <Counter
                current={activePeriodIndex + 1}
                total={timePeriods.length}
                setPeriod={handleYearChange}
            />
            <EventSlider events={activePeriod.events} />
        </Layer>
    );
};

export default MainLayer;
