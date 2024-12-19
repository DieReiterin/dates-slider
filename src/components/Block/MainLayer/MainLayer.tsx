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
    height: 100%;
    padding: 170px 0 0;
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
            <DatesDisplay>
                <h2>{activePeriod.startYear}</h2>
                <h2 className="red">{activePeriod.endYear}</h2>
            </DatesDisplay>
            <CirclePoints
                // current={activePeriodIndex + 1}
                total={3}
                // total={timePeriods.length}
                // setPeriod={handleYearChange}
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