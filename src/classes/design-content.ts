export interface IdContent {
    name: string;
    shortName: string;
    sub: string;
    code: string;
    completion: string;
    linkName: string;
    link: string;
}
const dContent: { [name: string]: IdContent } = {
    Blank: {
        name: '',
        shortName: '',
        sub: '',
        code: '',
        completion: '',
        linkName: '',
        link: '/'
    },
    OpenGarage: {
        name: 'Open Garage',
        shortName: 'OG',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        linkName: '',
        link: '/'
    },
    WMI: {
        name: 'Working Men\'s Institute',
        shortName: 'WMI',
        sub: 'any',
        code: 'HTML/CSS/JS',
        completion: 'nada',
        linkName: '',
        link: '/'
    },
    DD: {
        name: 'Dance Database',
        shortName: 'DD',
        sub: 'any',
        code: 'React',
        completion: 'nada',
        linkName: '',
        link: '/'
    },
    Sourcerer: {
        name: 'Sourcerer',
        shortName: 'Sourcerer',
        sub: 'any',
        code: 'HTML/JS/CSS',
        completion: 'nada',
        linkName: '',
        link: '/'
    },
    SS: {
        name: 'Savvy Savings',
        shortName: 'Savvy Savings',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        linkName: '',
        link: '/'
    },
    Kahani: {
        name: 'Kahani',
        shortName: 'Kahani',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        linkName: 'kahani.tech',
        link: 'https://kahani.tech'
    }
};
export const designContents = [
    dContent.Kahani,
    dContent.OpenGarage,
    dContent.WMI,
    dContent.DD,
    dContent.SS,
    dContent.Sourcerer,
    dContent.Blank
];
export enum DContents {
    Kahani,
    OpenGarage,
    WMI,
    DD,
    SS,
    Sourcerer,
    Blank
}