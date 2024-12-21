import { ITimePeriod } from '@/types/types';

export const timePeriods: ITimePeriod[] = [
    {
        startYear: 2001,
        endYear: 2010,
        topic: 'Литература',
        events: [
            { year: 2001, text: 'Нобелевская премия по литературе' },
            { year: 2005, text: 'Опубликована Нобелевская' },
            { year: 2006, text: 'Опубликована Нобелевская 2' },
            { year: 2010, text: 'Опубликована последняя книга' },
        ],
    },
    {
        startYear: 2011,
        endYear: 2014,
        topic: 'Кино',
        events: [
            { year: 2011, text: 'Оскар за лучший фильм получил Birdman.' },
            { year: 2012, text: 'Вышел Оскар за лучший' },
            { year: 2013, text: 'Вышел Оскар за лучший 2' },
            { year: 2014, text: 'Вышел фильм Ла-Ла Ленд.' },
        ],
    },
    {
        startYear: 2015,
        endYear: 2022,
        topic: 'Наука',
        events: [
            {
                year: 2015,
                text: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
            },
            {
                year: 2016,
                text: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
            },
            {
                year: 2017,
                text: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
            },
            { year: 2022, text: 'Научное событие 3' },
        ],
    },
];
