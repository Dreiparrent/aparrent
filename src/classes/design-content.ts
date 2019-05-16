export interface IdContent {
    name: string;
    shortName: string;
    sub: string;
    code: string;
    completion: string;
    linkName: string;
    link: string;
    img: string;
    bg: string;
}
const dContent: { [name: string]: IdContent } = {
    Blank: {
        name: '',
        shortName: '',
        sub: '',
        code: '',
        completion: '',
        linkName: '',
        link: '/',
        img: '',
        bg: ''
    },
    OpenGarage: {
        name: 'Open Garage',
        shortName: 'Open Garage',
        sub: '(details coming soon)',
        code: 'Angular',
        completion: 'nada',
        linkName: 'opengarage.aparrent.com',
        link: '/opengarage',
        img: '/assets/img/og-logo.png',
        bg: '/assets/sites/og.png'
    },
    WMI: {
        name: 'Working Men\'s Institute',
        shortName: 'WMI',
        sub: 'The Working Men\'s Institute library and museum is Indiana\'s oldest public library. It functions as a invaluable service to citizens of New Harmony',
        code: 'HTML/CSS/JS',
        completion: 'nada',
        linkName: 'wmi.aparrent.com',
        link: '/wmi',
        img: '/assets/img/wmi-logo.png',
        bg: '/assets/sites/wmi.png'
    },
    DD: {
        name: 'Dance Database',
        shortName: 'Dandce Database',
        sub: '(details coming soon)',
        code: 'React',
        completion: 'nada',
        linkName: '',
        link: '/',
        img: '/assets/img/og-logo.png',
        bg: '/assets/sites/dd.png'
    },
    Sourcerer: {
        name: 'Sourcerer',
        shortName: 'Sourcerer',
        sub: '(details coming soon)',
        code: 'HTML/JS/CSS',
        completion: 'nada',
        linkName: '',
        link: '/',
        img: '/assets/img/sour-logo.png',
        bg: '/assets/sites/sourcerer.png'
    },
    SS: {
        name: 'Savvy Savings',
        shortName: 'Savvy Savings',
        sub: '(details coming soon)',
        code: 'Angular',
        completion: 'nada',
        linkName: 'savvysavings.aparrent.com',
        link: '/savvysavings',
        img: '/assets/img/ss-logo.png',
        bg: '/assets/sites/ss.png'
    },
    Kahani: {
        name: 'Kahani',
        shortName: 'Kahani',
        sub: '(details coming soon)',
        code: 'Angular',
        completion: 'nada',
        linkName: 'kahani.tech',
        link: '/kahani',
        img: '/assets/img/og-logo.png',
        bg: '/assets/sites/kahani.png'
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