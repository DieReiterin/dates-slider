import { ITimePeriod } from '@/types/types';

export const timePeriods: ITimePeriod[] = [
    {
        startYear: 2001,
        endYear: 2010,
        topic: 'Литература',
        events: [
            {
                year: 2001,
                text: 'Нобелевская премия по литературе присуждена Гао Синцзяню.',
            },
            {
                year: 2010,
                text: 'Опубликована последняя книга трилогии «Властелин колец».',
            },
        ],
    },
    {
        startYear: 2011,
        endYear: 2014,
        topic: 'Кино',
        events: [
            { year: 2011, text: 'Оскар за лучший фильм получил Birdman.' },
            { year: 2014, text: 'Вышел фильм Ла-Ла Ленд.' },
        ],
    },
    {
        startYear: 2015,
        endYear: 2022,
        topic: 'Наука',
        events: [
            { year: 2015, text: 'Научное событие 1' },
            { year: 2022, text: 'Научное событие 2' },
        ],
    },
];
