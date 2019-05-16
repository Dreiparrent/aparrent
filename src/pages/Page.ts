import { IPositions, IText } from "../components/Canvas";
import GSAP, { TweenLite } from 'gsap';
import * as PIXI from 'pixi.js';
export class Page<T extends IElements, S = {}> implements IPage {
    private _timer!: any;
    protected open!: () => void;
    protected close!: (page?: number) => void;
    protected resize!: () => void;
    protected init!: () => void;
    protected _animations!: GSAP.TweenLite[] | GSAP.Animation[];
    public _isInit = false;
    private _isOpen = false;
    public _container = new PIXI.Container;
    public _bg = new PIXI.Container;
    public _fg = new PIXI.Container;
    public _content = new PIXI.Container;
    public _background: PIXI.Sprite;

    constructor(protected props: IProps<T>) {
        this.props.stage.addChild(this._container);
    }

    public _resize(positions?: IPositions) {
        if (positions)
            this.props.positions = positions;
        this.props.relayMenus(true);
        if (this._background) {
            this._background.width = this.props.positions.innerWidth;
            this._background.height = this.props.positions.innerHeight;
        }
        this.props.relayMenus(false);
        this.resize();
    }

    public _open() {
        if (!this._isOpen) {
            this._init(!this._isInit)
            this._resize();
            clearTimeout(this._timer);
            TweenLite.to(this._bg, 0.1, { alpha: 1 });
            TweenLite.to(this._bg.children, 0.4, { rotation: 0 });
            TweenLite.to(this._fg, 0.5, { x: 0, y: 0 });
            this._timer = setTimeout(() => {
                this.open();
                this._isOpen = true;
            }, 500);
        }
    }

    public _init(pageInit = true) {
        if (this._background) {
            this._bg.addChild(this._background);
        }
        this._fg.addChild(this._content);
        this._container.addChild(
            this._bg,
            this._fg
        )
        if (pageInit)
            this.init();
    }

    public _close(page?: number) {
        if (this._isInit && this._isOpen) {
            this.close(page);
            this._isOpen = false;
            this._timer = setTimeout(() => {
                TweenLite.to(this._bg, 0.25, { alpha: 0 });
                this._fg.removeChildren();
            }, 600);
        }
    }
}
export interface IProps<T extends IElements> {
    // elements: T;
    positions: IPositions;
    renderer: PIXI.Renderer;
    stage: PIXI.Container;
    ticker: PIXI.Ticker;
    relayMenus: (remove?: boolean) => void;
    fullscreen: () => void;
}
interface IElements {
    background?: PIXI.Sprite,
    content: PIXI.Container
}
export interface IhomeElements extends IElements {
    arrowLines: PIXI.Graphics;
    arrowContainer: PIXI.Container;
    arrowTexture: PIXI.Texture;
    text: PIXI.Text[];
}
export interface IdesignElements extends IElements {
    boxCont: PIXI.Container,
    boxArray: PIXI.Container[]
    media: IMediaContent
}
interface IMediaContent {
    lg: PIXI.Container;
    xl: PIXI.Container;
    md: PIXI.Container;
    sm: PIXI.Container;
}
export interface IPage {
    _isInit: boolean;
    _resize(positions?: IPositions): void;
    _open(): void;
    _close(page?: number): void;
}