export class DesignContent {
    static Blank: IdContent = {
        name: '',
        shortName: '',
        sub: '',
        code: '',
        completion: '',
        link: ''
    }
    static OpenGarage: IdContent = {
        name: 'Open Garage',
        shortName: 'OG',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        link: 'link.com'
    };
    static WMI: IdContent = {
        name: 'Working Men\'s Institute',
        shortName: 'WMI',
        sub: 'any',
        code: 'HTML/CSS/JS',
        completion: 'nada',
        link: 'link.com'
    };
    static DD: IdContent = {
        name: 'Dance Database',
        shortName: 'DD',
        sub: 'any',
        code: 'React',
        completion: 'nada',
        link: 'link.com'
    };
    static Sourcerer: IdContent = {
        name: 'Sourcerer',
        shortName: 'Sourcerer',
        sub: 'any',
        code: 'HTML/JS/CSS',
        completion: 'nada',
        link: 'link.com'
    };
    static SS: IdContent = {
        name: 'Savvy Savings',
        shortName: 'Savvy Savings',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        link: 'link.com'
    };
    static Kahani: IdContent = {
        name: 'Kahani',
        shortName: 'Kahani',
        sub: 'any',
        code: 'Angular',
        completion: 'nada',
        link: 'link.com'
    };
    static contents = [
        DesignContent.Kahani,
        DesignContent.OpenGarage,
        DesignContent.WMI,
        DesignContent.DD,
        DesignContent.SS,
        DesignContent.Sourcerer,
        DesignContent.Blank
    ]
    static getContent(content: DesignContents) {
        return DesignContent.contents[content];
    }
}
export interface IdContent {
    name: string;
    shortName: string;
    sub: string;
    code: string;
    completion: string;
    link: string;
}
export enum DesignContents {
    Kahani,
    OpenGarage,
    WMI,
    DD,
    SS,
    Sourcerer,
    Blank
}