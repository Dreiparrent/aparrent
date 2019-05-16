import GSAP from 'gsap';
import { Observable } from 'rxjs';
import { IPositions } from '../components/Canvas';
import * as PIXI from 'pixi.js';

export class Menu {
    public sprite: PIXI.Sprite;
    public content: PIXI.Container;
    protected readonly position: { x: number, y: number };
    public _anchor = { x: 0.5, y: 0.5 };

    init: () => void;
    protected _isInit = false;

    protected _currentIndex = 0;
    public get currentIndex() {
        return this._currentIndex;
    }

    protected _isOpen = false;
    public get isOpen() {
        return this._isOpen;
    }

    protected resize!: () => void;

    protected _animations: GSAP.TweenLite[];

    constructor(protected positions: IPositions, protected container: PIXI.Container, protected renderer: PIXI.Renderer) {
        this.position = { x: 0, y: 0 };
        this.content = new PIXI.Container;
    }

    _init() {
        this.sprite.buttonMode = this.sprite.interactive = true;
        this.sprite.anchor.set(this._anchor.x, this._anchor.y);
        this.container.addChild(this.sprite);
        this.container.addChild(this.content);
        this.init()
        this._resize();
    }

    _resize = (positions?: IPositions) => {
        if (positions)
            this.positions = positions;
        this.sprite.position.set(this.position.x, this.position.y);
        this.resize();
    }
}
export interface IMenuClass {
    sprite: PIXI.Sprite;
    position: { x: number, y: number };
    currentIndex: number;
    isOpen: boolean;
    open: (index?: number) => void;
    close: () => void;
    _resize: (positions?: IPositions) => void;
}