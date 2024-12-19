import React, { useState } from 'react';
import styled from 'styled-components';

interface ICounterProps {
    current: number;
    total: number;
    setPeriod: (newValue: number) => void;
}

const CounterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 120px;
    height: 90px;
    margin: 0 0 55px;
    border: 1px solid black;
`;

const Count = styled.div`
    font-size: 14px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid red;
`;

const Button = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 32px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    &:hover {
        background-color: #e0e0e0;
    }
`;

const Counter: React.FC<ICounterProps> = ({ current, total, setPeriod }) => {
    const increment = () => {
        if (current < total) {
            setPeriod(current + 1);
        }
    };

    const decrement = () => {
        if (current > 1) {
            setPeriod(current - 1);
        }
    };

    return (
        <CounterContainer>
            <Count>{`0${current.toString()}/0${total}`}</Count>
            <Buttons>
                <Button onClick={decrement}>-</Button>
                <Button onClick={increment}>+</Button>
            </Buttons>
        </CounterContainer>
    );
};

export default Counter;
