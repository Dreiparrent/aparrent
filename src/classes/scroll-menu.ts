import { Menu, IMenuClass } from "./menu";
import { Observable } from "rxjs";
import { IPositions } from "../components/Canvas";
import * as PIXI from 'pixi.js';
import GSAP, { TweenLite, Power2, Power1 } from 'gsap';

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
    innerScroll: PIXI.Sprite;

    constructor(positions: IPositions, container: PIXI.Container, renderer: PIXI.Renderer) {
        super(positions, container, renderer);
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x00FFFF);
        graphics.drawCircle(0, 0, 200);
        graphics.endFill();
        // const texture = graphics.generateCanvasTexture();
        const texture = this.renderer.generateTexture(graphics,1,1);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.on('pointerdown', this.open);
        this._init();
    }

    init = () => {
        const iconHome = PIXI.Sprite.from('/assets/icons/icon-96.png');
        const iconPhoto = PIXI.Sprite.from('/assets/icons/mi_photo_camera_2x.png');
        const iconDesign = PIXI.Sprite.from('/assets/icons/mi_settings_system_daydream_2x.png');
        const iconMask = new PIXI.Graphics;
        this.content.addChild(iconMask);
        iconMask.beginFill(0x000000);
        iconMask.drawCircle(42, 48, 68);
        this.innerScroll = new PIXI.Sprite(null);
        iconPhoto.anchor.set(2, -0.5);
        iconHome.anchor.set(2, 0);
        iconDesign.anchor.set(2, 0.5);
        iconPhoto.rotation = 0.2;
        iconDesign.rotation = -0.2;
        iconPhoto.position.set(214, -135)
        iconHome.position.set(180, 0);
        iconDesign.position.set(214, 135)
        this.innerScroll.addChild(iconPhoto, iconHome, iconDesign);
        this.content.addChild(this.innerScroll);
        this.innerScroll.anchor.set(2, 0.5);
        this.innerScroll.mask = iconMask;
    }
    open = (index: number) => {
        const i = index - 1;
        TweenLite.to(this.innerScroll.position, 0.2, { y: -125 * i});
        TweenLite.to(this.innerScroll, 0.2, { rotation: 0.2 * i});
    }

    close = () => {

    }

    resize = () => {
        this.content.position.set(this.position.x - 160, this.position.y - 50);
    }
}
