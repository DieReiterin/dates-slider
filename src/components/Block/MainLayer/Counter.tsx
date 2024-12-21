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
    padding-left: 75px;
`;

const Count = styled.div`
    font-size: 24px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid red;
`;

const Button = styled.button<{ enabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid #42567a;
    opacity: ${({ enabled }) => (enabled ? '1' : '0.5')};
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    svg {
        width: 10px;
        height: 20px;
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
                <Button enabled={current > 1} onClick={decrement}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 12"
                        fill="none"
                    >
                        <path
                            d="M6 1L1 6L6 11"
                            stroke="#42567a"
                            strokeWidth="2"
                        />
                    </svg>
                </Button>
                <Button enabled={current < total} onClick={increment}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 12"
                        fill="none"
                    >
                        <path
                            d="M1 1L6 6L1 11"
                            stroke="#42567a"
                            strokeWidth="2"
                        />
                    </svg>
                </Button>
            </Buttons>
        </CounterContainer>
    );
};

export default Counter;
