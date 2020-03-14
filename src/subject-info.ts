enum Subject {
    math,
    biology,
    chemistry,
    computing,
    freeTime,
    english,
    geography,
    spanish,
    artLanguages,
    civics,
    history,
    physics,
    reprSystems,
    break,
}

type Professor = 
    'Rodolfo Ruiz' | 'Rolando Cruz' | 'Lino Acchura' |
    'Yanina Romero' | 'Edgardo Balanza' | 'Juan Borja' |
    'Norma Perez' | 'Luciana Llapur' | 'Ivone Quispe' |
    'Humana';

interface SubjectInfo {
    name?: 'Matemática' | 'Biología' | 'Química' |
        'Informática' | 'Hora Libre' | 'Inglés' |
        'Geografía' | 'Lengua' | 'Lenguages Artísticos' |
        'Formación Ciudadana' | 'Historia' | 'Física' |
        'Sistemas de Representación' | 'Recreo';
    color: string;
    onprimary: 'black' | 'white';
    professor?: Professor;
    notes?: string;
}


const subjectInfo = new Map<Subject, SubjectInfo>([
    [Subject.math, {
        name: 'Matemática',
        professor: 'Rodolfo Ruiz',
        color: '#2196f3',
        onprimary: 'black',
    }],
    [Subject.biology, {
        name: 'Biología',
        professor: "Ivone Quispe",
        color: '#8bc34a',
        onprimary: 'black'
    }],
    [Subject.chemistry, {
        name: 'Química',
        professor: 'Norma Perez',
        color: '#ffc107',
        onprimary: 'black',
    }],
    [Subject.computing, {
        name: 'Informática',
        professor: 'Lino Acchura',
        color: '#00bcd4',
        onprimary: 'black',
    }],
    [Subject.freeTime, {
        name: 'Hora Libre',
        color: '#212121',
        onprimary: 'white',
    }],
    [Subject.english, {
        name:  'Inglés',
        notes: 'Por ahora no hay inglés porque Grepi se jubiló',
        color: '#9c27b0',
        onprimary: 'white',
    }],
    [Subject.geography, {
        name: 'Geografía',
        professor: 'Rolando Cruz',
        color: '#673ab7',
        onprimary: 'white',
    }],
    [Subject.spanish, {
        name: 'Lengua',
        professor: 'Yanina Romero',
        color: '#d32f2f',
        onprimary: 'white',
    }],
    [Subject.artLanguages, {
        name: 'Lenguages Artísticos',
        professor: 'Edgardo Balanza',
        color: '#3f51b5',
        onprimary: 'white',
    }],
    [Subject.civics, {
        name: 'Formación Ciudadana',
        professor: 'Luciana Llapur',
        color: '#009688',
        onprimary: 'white',
    }],
    [Subject.history, {
        name: 'Historia',
        color: '#ffb74d',
        onprimary: 'black',
    }],
    [Subject.physics, {
        name: 'Física',
        professor: 'Norma Perez',
        color: '#7986cb',
        onprimary: 'black',
    }],
    [Subject.reprSystems, {
        name: 'Sistemas de Representación',
        professor: 'Juan Borja',
        color: '#795548',
        onprimary: 'white',
    }],
    [Subject.break, {
        name: 'Recreo',
        color: '#212121',
        onprimary: 'white',
    }]
]);

Object.freeze(subjectInfo);

export { subjectInfo as default, SubjectInfo, Subject, Professor };
