import { Menu, IMenuClass } from './menu';
import { Observable } from 'rxjs';
import * as PIXI from 'pixi.js';
import { IPositions } from '../components/Canvas';
import { TweenLite, Cubic, Power2 } from 'gsap';
import { CanvasService } from '../services/canvas.service';

export class FansMenu extends Menu implements IMenuClass {
    position = { x: 0, y: 0 };
    private closer = new PIXI.Graphics;
    private spriteShadow: PIXI.Sprite;

    constructor(positions: IPositions, container: PIXI.Container, renderer: PIXI.Renderer) {
        super(positions, container, renderer);
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x00FFFF);
        graphics.drawCircle(0, 0, 300);
        graphics.endFill();
        // const texture = graphics.generateCanvasTexture();
        const texture = this.renderer.generateTexture(graphics, 1, 1);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.on('pointerdown', this.open);
        this.spriteShadow = CanvasService.createShadow(graphics, this.renderer, 50, 50);
        this.spriteShadow.anchor.set(0.5);
        this.container.addChildAt(this.spriteShadow, 0);
        this._init();
    }

    init = () => {
        this.spriteShadow.alpha = 0;
        this.sprite.width = this.spriteShadow.width = 360;
        this.sprite.height = this.spriteShadow.height = 360;
        this.closer.beginFill(0x000000);
        this.closer.drawRect(0, 0, this.positions.innerWidth, this.positions.innerHeight);
        this.closer.endFill();
        this.closer.alpha = 0;
        this.closer.interactive = true;
        this.closer.addListener('mousedown', this.close);
        this.container.addChildAt(this.closer, 0);
    }

    public open = () => {
        if (!this._animations) {
            this._animations = [];
            this._animations.push(
                TweenLite.fromTo(this.spriteShadow, 0.4, { alpha: 0 }, { alpha: 0.7, ease: Power2.easeInOut }),
                TweenLite.to(this.spriteShadow, 0.4, { width: 600, height: 600, ease: Power2.easeOut }),
                TweenLite.to(this.sprite, 0.4, { width: 600, height: 600, ease: Power2.easeOut })
            );
        } else {
            this._animations.forEach(a => a.play());
        }
        this.sprite.buttonMode = false;
        this.setClose(true);
    }
    public close = () => {
        this.setClose(false);
        this._animations.forEach(a => a.reverse());
    }

    private setClose(isOpen: boolean) {
        if (isOpen) {
            this.closer.width = this.positions.innerWidth;
            this.closer.height = this.positions.innerHeight;
        } else {
            this.closer.width = 0;
            this.closer.height = 0;
        }
        this.sprite.buttonMode = !isOpen;
    }

    resize = () => {
        this.setClose(this.isOpen);
        // this.sprite.position.set(this.position.x, this.position.y);
    }
}
