import { Page, IProps, IhomeElements } from "./Page";
import GSAP, { TweenLite } from 'gsap';

export class Photography extends Page<any> {

    public backgroundImage: PIXI.Sprite;
    private boxCont: PIXI.Container;

    constructor(props: IProps<IhomeElements>) {
        super(props);
        // let texture = PIXI.Texture.fromImage('assets/mcb.jpg');
        // console.log(texture.width, texture.height);
        // this.backgroundImage = new PIXI.Sprite(texture);
        // console.log(this.backgroundImage.width, this.backgroundImage.height);
        // console.log(this.backgroundImage.getBounds());
        // const multiplier = this.props.positions.innerHeight / this.backgroundImage.height; // * this.backgroundImage.width;
        // this.backgroundImage.height = this.resizeService.positions.innerHeight;
        // this.backgroundImage.width = this.resizeService.positions.innerHeight;
        // console.log(multiplier);
        // this.backgroundImage.width = this.background.width; // * multiplier;
        // this.backgroundImage.height = this.resizeService.positions.innerHeight;
        // this.backgroundImage.anchor.set(1.5, 0.5);
        // this.backgroundImage.rotation = 1;
        // this.backgroundImage.anchor.set(2, 0.5);
        // this.container.addChild(this.backgroundImage);
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x000000, 0.7);
        // graphics.beginFill(0x3D6999, 0.7);
        graphics.drawRect(0, 0, this.props.positions.innerWidth, this.props.positions.innerHeight);
        graphics.endFill();
        const texture = graphics.generateCanvasTexture();
        this._background = new PIXI.Sprite(texture);
        this._background.anchor.set(1.5, 0.5);
        this._background.rotation = 1;
        this._open();
    }

    init = () => {
        const graphics = new PIXI.Graphics;
        graphics.lineStyle(5, 0xFFFFFF);
        graphics.moveTo(0, 0);
        graphics.lineTo(400, 0);
        graphics.lineTo(400, 700);
        graphics.lineTo(0, 700);
        graphics.lineTo(0, 0);
        const texture = graphics.generateCanvasTexture();

        this.boxCont = new PIXI.Container;        
        this.boxCont.skew.x = 50;
        // overs -- these can go inside mask (for color contrast)
        const over = new PIXI.Graphics;
        // over1.moveTo(200, 0);
        over.beginFill(0x063CAD);
        over.drawRect(0, 0, 405, 100);
        const overTexture = over.generateCanvasTexture();
        for (let i = 0; i < 3; i++) {
            const sprite = new PIXI.Sprite(texture);
            sprite.position.x = -210 + i * 410;
            sprite.tint = 0x3D6999;
            sprite.alpha = 0;
            sprite.anchor.set(0.5);
            const overSprite1 = new PIXI.Sprite(overTexture);
            overSprite1.anchor.set(0.5)
            overSprite1.position.set(-210 + i * 410, -300);
            overSprite1.alpha = 0;
            const overSprite2 = new PIXI.Sprite(overTexture);
            overSprite2.anchor.set(0.5)
            overSprite2.position.set(-610 + i * 410, 305);
            overSprite2.alpha = 0;
            this.boxCont.addChild(sprite, overSprite1, overSprite2);
        }
        (this.boxCont.children[0] as PIXI.Sprite).on('pointerover', this.hover.bind(this));
        (this.boxCont.children[0] as PIXI.Sprite).on('pointerout', this.unhover.bind(this));
        (this.boxCont.children[6] as PIXI.Sprite).on('pointerdown', () => {
            this.props.fullscreen();
        }); 
        (this.boxCont.children[0] as PIXI.Sprite).interactive =
            (this.boxCont.children[0] as PIXI.Sprite).buttonMode =
            (this.boxCont.children[6] as PIXI.Sprite).interactive = 
            (this.boxCont.children[6] as PIXI.Sprite).buttonMode = true;
        this._isInit = true;
    }
    /*
    resize() {
        this.canvasService.app.stage.removeChild(this.container);
        this.canvasService.app.stage.removeChild(this.canvasService.menuContainer);
        // TODO: resize not working
        this.backgroundImage.width = this.resizeService.positions.innerWidth;
        this.backgroundImage.height = this.resizeService.positions.innerHeight;
        // this.backgroundImage.position.set(this.resizeService.positions.innerWidth * 1.5, this.resizeService.positions.halfHeight);
        this.background.width = this.resizeService.positions.innerWidth;
        this.background.height = this.resizeService.positions.innerHeight;
        this.background.position.set(this.resizeService.positions.innerWidth * 1.5, this.resizeService.positions.halfHeight);
        // this.backgroundImage.position.set(0, 0);
        // this.background.position.set(this.resizeService.positions.innerWidth * 1.5, this.resizeService.positions.halfHeight);
        this.canvasService.app.stage.addChild(this.container);
        this.canvasService.app.stage.addChild(this.canvasService.menuContainer);
    }
    */
    hover(box?: PIXI.Container) {
        // this.boxCont.children[3].position.set(-400, 0);
    }

    unhover(box?: PIXI.Container) {
        // this.boxCont.children[3].position.set(0, 0);
    }

    open = () => {
        this._fg.addChild(this.boxCont);
        // TweenLite.to(this.boxCont.children, 0.3, { alpha: 1 });
        // /*
        this._animations = [];
        // if (!this._animations)
            this._animations = [
                TweenLite.to(this.boxCont.children[0], 0.3, { x: '-=200', alpha: 1 }).delay(0),
                TweenLite.to(this.boxCont.children[3], 0.3, { x: '-=200', alpha: 1 }).delay(0.05),
                TweenLite.to(this.boxCont.children[6], 0.3, { x: '-=200', alpha: 1 }).delay(0.1),
                TweenLite.to(this.boxCont.children[1], 0.3, { x: '-=200', alpha: 1 }).delay(0.2),
                TweenLite.to(this.boxCont.children[2], 0.3, { x: '+=200', alpha: 1 }).delay(0.2),
                TweenLite.to(this.boxCont.children[4], 0.3, { x: '-=200', alpha: 1 }).delay(0.25),
                TweenLite.to(this.boxCont.children[5], 0.3, { x: '+=200', alpha: 1 }).delay(0.25),
                TweenLite.to(this.boxCont.children[7], 0.3, { x: '-=200', alpha: 1 }).delay(0.3),
                TweenLite.to(this.boxCont.children[8], 0.3, { x: '+=200', alpha: 1 }).delay(0.3),
            ];
            // */
        // else this._animations.forEach(a => a.play());
        // FLy in from right
        // Fly in titles with small delay
    }

    close = () => {
        // const anim = [TweenLite.to(this.boxCont.children[0], 0.3, { x: '-=200', delay: 0 }).delay(0.2)];
        this._animations.forEach(a => a.reverse());        
        setTimeout(() => {
            TweenLite.to(this._bg.children, 0.5, { rotation: 1 });
        }, 500);
    }

    resize = () => {
        this._background.position.set(this.props.positions.innerWidth * 1.5, this.props.positions.halfHeight);
        this.boxCont.position.set(this.props.positions.halfWidth, this.props.positions.halfHeight);
        if (this.props.positions.innerWidth > 1600) {

        } else if (this.props.positions.innerWidth > 1350) {
            // this.boxCont.position.x = 200 + this.props.positions.halfWidth * 0.1;
        } else if (this.props.positions.innerWidth > 1180) {

        } else {

        }
        
    }
}