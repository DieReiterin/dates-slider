export interface IEvent {
    year: number;
    text: string;
}

export interface ITimePeriod {
    startYear: number;
    endYear: number;
    topic: string;
    events: IEvent[];
}
