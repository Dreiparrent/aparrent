import { Menu, IMenuClass } from './menu';
import { Subscription, Observable } from 'rxjs';
import { IPositions, Styles } from '../components/Canvas';
import { CanvasService } from '../services/canvas.service';
declare var TweenLite: typeof gsap.TweenLite;
declare var Power2: typeof gsap.Power2;
import * as PIXI from 'pixi.js';

export class UnsureMenu extends Menu implements IMenuClass {

    public unsureMenu: PIXI.Sprite;
    private unsureMenuShadow: PIXI.Sprite;
    private unsureMenuOverlay: PIXI.Sprite;
    private xText: PIXI.Text;

    get position() {
        return {
            x: 0, y: this.positions.innerHeight
        };
    }
    set position(p: { x: number, y: number }) { }
    public _anchor = { x: 0, y: 1 };

    constructor(positions: IPositions, container: PIXI.Container, renderer: PIXI.Renderer) {
        super(positions, container, renderer);
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x00FFFF);
        graphics.quadraticCurveTo(0, 150, 150, 150);
        graphics.lineTo(0, 150);
        graphics.endFill();
        // const texture = graphics.generateCanvasTexture();
        const texture = this.renderer.generateTexture(graphics,1,1);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.on('pointerdown', this.open);
        this._init();
    }

    init = () => {
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x146BCC);
        graphics.drawRoundedRect(0, 0, this.positions.innerWidth, this.positions.innerHeight, 200);
        graphics.moveTo(this.positions.innerWidth, 0);
        graphics.lineTo(this.positions.innerWidth, 200);
        graphics.lineTo(this.positions.innerWidth - 200, 0);
        // graphics.lineTo(this.resizeService.positions.innerWidth, this.resizeService.positions.innerHeight);
        // const texture = graphics.generateCanvasTexture();
        const texture = this.renderer.generateTexture(graphics, 1, 1);
        this.unsureMenu = new PIXI.Sprite(texture);
        this.unsureMenu.anchor.set(0.5, 0.5);
        this.unsureMenuShadow =
            CanvasService.createShadow(graphics, this.renderer, 0, 0);
        this.unsureMenuShadow.position.set(-this.positions.innerWidth, 2 * this.positions.innerHeight);
        this.unsureMenu.position.set(-this.positions.halfWidth, 2 * this.positions.innerHeight);
        const overlayGraphics = new PIXI.Graphics;
        overlayGraphics.beginFill(0x000000, 0.8);
        overlayGraphics.drawRect(0, 0, this.positions.innerWidth, this.positions.innerHeight);
        // const overlayTexture = overlayGraphics.generateCanvasTexture();
        const overlayTexture = this.renderer.generateTexture(overlayGraphics, 1, 1);
        this.unsureMenuOverlay = new PIXI.Sprite(overlayTexture);
        this.unsureMenuOverlay.height = 0;
        // this.unsureMenuOverlay.position.y = -this.positions.innerHeight;
        // this.unsureMenuOverlay.position.y = this.positions.halfHeight;
        this.container.addChild(this.unsureMenuOverlay);
        this.container.addChild(this.unsureMenuShadow);
        this.container.addChild(this.unsureMenu);
        this.setText();
        this._resize();
        this._isInit = true;
    }

    private setText() {
        this.xText = new PIXI.Text('x', CanvasService.styles[Styles.small]);
        this.container.addChild(this.xText);
        this.xText.anchor.x = 2;
        this.xText.interactive = this.xText.buttonMode = true;
        this.xText.on('pointerdown', this.close.bind(this));
        this.xText.visible = false;
    }

    positionText() {
        const unsureMenuBounds = this.unsureMenu.getBounds();
        this.xText.position.set(unsureMenuBounds.x + unsureMenuBounds.width, unsureMenuBounds.y);
        this.xText.visible = true;
    }

    resize = () => {
        this.unsureMenu.width = this.positions.innerWidth * 0.95;
        this.unsureMenu.height = this.positions.innerHeight * 0.95;
        this.unsureMenuShadow.width = this.positions.innerWidth;
        this.unsureMenuShadow.height = this.positions.innerHeight;
        this.unsureMenuOverlay.height = 0
        this.unsureMenuOverlay.width = this.positions.innerWidth;
        if (this.isOpen) {
            this.unsureMenuOverlay.height = this.positions.innerHeight;
            // this.unsureMenu.height = this.positions.innerHeight;
            // this.unsureMenu.position.set(this.positions.halfWidth, this.positions.halfHeight);
            this.unsureMenu.position.set(this.positions.halfWidth, this.positions.halfHeight);
            this.positionText();
        }
    }

    open = () => {
        console.log('test');
        if (this.isOpen)
            return;
        if (!this._isInit)
            this.init();
        if (!this._animations) {
            this._animations = [];
            this._animations.push(
                TweenLite.to(this.unsureMenu.position, 0.4,
                    { x: this.positions.halfWidth, y: this.positions.halfHeight, ease: Power2.easeOut }),
                TweenLite.to(this.unsureMenuShadow.position, 0.4, { x: 50, y: 50, ease: Power2.easeOut }),
                // TweenLite.to(this.unsureMenuOverlay.position, 0.4, { y: 0, ease: Power2.easeOut }),
                TweenLite.to(this.unsureMenuOverlay, 0.4, { height: this.positions.innerHeight, ease: Power2.easeOut })
            );
        }
        this._animations.forEach(t => t.play());
        setTimeout(() => {
            this.positionText();
        }, 500);
        this._isOpen = true;

    }
    close = () => {
        this.xText.visible = false;
        this._animations.forEach(t => t.reverse());
        setTimeout(() => {
            this._isOpen = false;
        }, 500);
    }
}
