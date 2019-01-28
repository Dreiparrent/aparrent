import { Menu, IMenuClass } from "./menu";
import { Observable } from "rxjs";
import { IPositions } from "../components/Canvas";

declare var TweenLite: typeof gsap.TweenLite;

export class ScrollMenu extends Menu implements IMenuClass {

    get position() {
        return {
            x: 100 + this.positions.innerWidth - this.positions.innerWidth / 25,
            y: this.positions.halfHeight
        };
    }
    set position(a:{x: number, y: number}) {

    };

    _currentIndex: number;


    constructor(positions: IPositions, container: PIXI.Container) {
        super(positions, container);
        const graphics = new PIXI.Graphics;
        // this._currentIndex = pageService.scrollIndex;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x00FFFF);
        graphics.drawCircle(0, 0, 200);
        graphics.endFill();
        const texture = graphics.generateCanvasTexture();
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.on('pointerdown', this.open);
        this._init();
    }

    init = () => {
        
    }
    open = (up = false) => {
    }

    close = () => {

    }

    resize = () => {

    }
}
