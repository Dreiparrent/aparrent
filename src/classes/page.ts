import { Subscription, BehaviorSubject, Observable } from "rxjs";
import * as GSAP from 'gsap';
import { Component } from "react";
import { IPositions, IText } from "../components/Canvas";
declare var TweenLite: typeof gsap.TweenLite;

export class Page<T extends IElements, S = {}> extends Component<IProps<T>, S> {
    protected _subscription: Subscription;
    private _timer!: any;
    protected open!: () => void;
    protected close!: () => void;
    protected resize!: () => void;

    protected _animations!: GSAP.TweenLite[];
    

    constructor(props: IProps<T>) {
        super(props);
        this._subscription = this.props.onResize$.subscribe(this._resize.bind(this));
    }

    _resize() {
        this.props.app.stage.removeChild(this.props.elements.container);
        this.props.relayMenus(true);
        this.props.elements.background.width = this.props.positions.innerWidth;
        this.props.elements.background.height = this.props.positions.innerHeight;
        this.props.app.stage.addChild(this.props.elements.container);
        this.props.relayMenus(false);
        this.resize();
    }

    _open(isO = true) {
        if (isO) {
            clearTimeout(this._timer);
            TweenLite.to(this.props.elements.bg, 0.25, { alpha: 1 });
            TweenLite.to(this.props.elements.bg.children, 0.4, { rotation: 0 });
            this._timer = setTimeout(() => {
                this.open();
            }, 250);
        } else this._close();
    }

    _close() {
        if (this.props.isInit) {
            this.close();
            clearTimeout(this._timer);
            this._timer = setTimeout(this._hide.bind(this), 300);
        }
    }
    private _hide() {
        
        this._timer = setTimeout(() => {
        }, 500);
    }

    componentWillMount() {
        // TweenLite.to(this.props.elements.bg, 0.25, { alpha: 0 });
        this._subscription.unsubscribe();
    }
}
export interface IProps<T extends IElements> {
    elements: T;
    positions: IPositions;
    app: PIXI.Application;
    onResize$: Observable<Window>;
    isInit: boolean;
    relayMenus: (remove?: boolean) => void;
    setInit: (page: number) => void;
}
interface IElements {
    container: PIXI.Container,
    bg: PIXI.Container,
    fg: PIXI.Container,
    background: PIXI.Sprite,
    content: PIXI.Container
}
export interface IhomeElements extends IElements {
    arrowLines: PIXI.Graphics;
    arrowContainer: PIXI.Container;
    arrowTexture: PIXI.Texture;
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