import { Subject } from './subject-info';

const NUMBER_OF_PERIODS = 8;
const SUM_OF_ALL_PERIODS = NUMBER_OF_PERIODS * ((1 + NUMBER_OF_PERIODS) / 2);

interface Period {
    subject: Subject;
    pos: number[];
}

const times: [
    // Five days
    Period[], Period[], Period[],
    Period[], Period[],
] = [
        [ // Monday
            {
                subject: Subject.math,
                pos: [1, 2],
            },
            {
                subject: Subject.math,
                pos: [3],
            },
            {
                subject: Subject.biology,
                pos: [4],
            },
            {
                subject: Subject.biology,
                pos: [5],
            },
            {
                subject: Subject.chemistry,
                pos: [6],
            },
            {
                subject: Subject.chemistry,
                pos: [7, 8],
            },
        ],
        [ // Tuesday
            {
                subject: Subject.computing,
                pos: [1, 2],
            },
            {
                subject: Subject.freeTime,
                pos: [3],
            },
            {
                subject: Subject.english,
                pos: [4],
            },
            {
                subject: Subject.geography,
                pos: [5],
            },
            {
                subject: Subject.spanish,
                pos: [6],
            },
            {
                subject: Subject.spanish,
                pos: [7, 8],
            },
        ],
        [ // Wednesday
            {
                subject: Subject.english,
                pos: [1, 2],
            },
            {
                subject: Subject.artLanguages,
                pos: [3, 4],
            },
            {
                subject: Subject.civics,
                pos: [5, 6],
            },
            {
                subject: Subject.geography,
                pos: [7, 8],
            },
        ],
        [ // Thursday
            {
                subject: Subject.math,
                pos: [1, 2],
            },
            {
                subject: Subject.math,
                pos: [3],
            },
            {
                subject: Subject.history,
                pos: [4],
            },
            {
                subject: Subject.physics,
                pos: [5, 6],
            },
            {
                subject: Subject.physics,
                pos: [7],
            },
            {
                subject: Subject.biology,
                pos: [8],
            },
        ],
        [ // Friday
            {
                subject: Subject.reprSystems,
                pos: [1, 2],
            },
            {
                subject: Subject.reprSystems,
                pos: [3, 4],
            },
            {
                subject: Subject.history,
                pos: [5, 6],
            },
            {
                subject: Subject.spanish,
                pos: [7, 8],
            }
        ],
    ];

Object.freeze(times);

// Verify all positions add up
times.forEach(v => {
    // Here we sum up all the values of the pos of each period
    let c = v.reduce<number[]>((prev, curr) => {
        return prev.concat(curr.pos);
    }, []).reduce((curr, prev) => curr + prev);
    // By using this method we ensure that all periods
    // are present and there are no repeats
    const message = 'The number of positions does not add up. ' +
        'Maybe you forgot to add a pos to a period';

    console.assert(c === SUM_OF_ALL_PERIODS, message);
    if (typeof (process) !== 'undefined' && c !== SUM_OF_ALL_PERIODS) {
        process.exit(1);
    }
});

/**
 * 
 */
const changeTimes = [['7:30', '8:05'], ['8:05', '8:45'], ['8:45', '8:55'],
    ['8:55', '9:30'], ['9:30', '10:10'], ['10:10', '10:20'],
    ['10:20', '10:55'], ['10:55', '11:35'], ['11:35', '11:45'],
    ['11:45', '12:20'], ['12:20', '12:55']];

const breaks = [3, 5, 7];

export { times as default, Period, changeTimes, breaks, NUMBER_OF_PERIODS };
export { default as subjectInfo, Subject, SubjectInfo, Professor } from './subject-info';
