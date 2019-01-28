import { Page, IProps, IdesignElements } from '../pages/Page';
import { CanvasService } from '../services/canvas.service';
import GSAP, { TweenLite, Power2, Power1 } from 'gsap';

// export class Design extends Component<{ service: DesignService }, { isInit: boolean, isOpen: boolean }>, Page {
export class Design extends Page<IdesignElements> {
    private boxHeight = 200;
    private mousePosition: { x: number, y: number };
    private hoverSquare: PIXI.Sprite;
    private boxCont = new PIXI.Container;
    private boxArray: PIXI.Container[] = [];
    private media = {
        xl: new PIXI.Graphics,
        lg: new PIXI.Graphics,
        md: new PIXI.Container,
        sm: new PIXI.Container
    };
    // private content: PIXI.Container;
    private clickIndex = -1;
    public textBlocks: IContentText[] = [
        {
            h: 'Open Garage',
            s: 'Open Garage',
            c: 'Content'
        },
        {
            h: 'Working Mens Institute',
            s: 'WMI',
            c: 'Content'
        },
        {
            h: 'Fake',
            s: 'Fake',
            c: 'Content'
        },
        {
            h: 'Sourcerer',
            s: 'Sourcerer',
            c: 'Content'
        },
        {
            h: 'Savvy Savings',
            s: 'Savvy Savings',
            c: 'Content'
        },
        {
            h: 'Coming Soon',
            s: 'Coming Soon',
            c: 'Content'
        }
    ];
    constructor(props: IProps<IdesignElements>) {
        super(props)
        console.log('construct');
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x3D6999, 1);
        graphics.drawRect(0, 0, this.props.positions.innerWidth, this.props.positions.innerHeight);
        graphics.endFill();
        const texture = graphics.generateCanvasTexture();
        this._background = new PIXI.Sprite(texture);
        this._background.anchor.set(1.5, 0.5);
        this._background.rotation = -1;
        this._open();
    }

    init = () => {
        const graphics = new PIXI.Graphics;
        graphics.lineStyle(5, 0xFF6B40);
        graphics.moveTo(0, 0);
        graphics.drawRect(0, 0, this.boxHeight, this.boxHeight);
        const texture = graphics.generateCanvasTexture();

        // Shadow
        const shadowGraphics = new PIXI.Graphics;
        shadowGraphics.beginFill(0x000000, 0.7);
        shadowGraphics.drawRect(0, 0, this.boxHeight, this.boxHeight);
        // shadowGraphics.endFill();

        // Rows
        const rows: PIXI.Container[] = [];
        for (let i = 0; i < 3; i++) {
            const row = new PIXI.Container;
            row.alpha = 0;
            row.position.y = i * this.boxHeight + 200;
            rows.push(row);
        }

        // Logos
        const logoSprites: PIXI.Sprite[] = [
            PIXI.Sprite.fromImage('assets/og-logo.png'),
            PIXI.Sprite.fromImage('assets/wmi-logo.png'),
            PIXI.Sprite.fromImage('assets/og-logo.png'),
            PIXI.Sprite.fromImage('assets/sour-logo.png'),
            PIXI.Sprite.fromImage('assets/ss-logo.png'),
            PIXI.Sprite.fromImage('assets/og-logo.png')
        ];
        const logoTints = [0xFF6B40, 0xFF815D, 0xFF9779, 0xFFB5A0, 0xFFD3C6, 0xFFEDE8]; // In Order
        // const logoTints = [0xFFEDE8, 0xFFB5A0, 0xFF9779, 0xFFD3C6, 0xFF815D, 0xFF6B40];
        for (let i = 0; i < 6; i++) {
            const box = new PIXI.Container();
            this.boxArray.push(box);
            // Shadow
            const shadow = CanvasService.createShadow(shadowGraphics);
            shadow.position.set(20, 20);
            box.addChild(shadow);

            // Logos
            logoSprites[i].anchor.set(0.5);
            logoSprites[i].position.set(100, 100);
            // logoSprites[i].tint = logoTints[i];
            logoSprites[i].width = logoSprites[i].height = 96; // TODO: remove this with real image sizes
            const circleMask = new PIXI.Graphics;
            circleMask.beginFill(0x000000, 0);
            circleMask.drawCircle(0, 0, 48);
            circleMask.position.set(100, 100);
            logoSprites[i].mask = circleMask; // TODO: remove this
            box.addChild(circleMask);
            box.addChild(logoSprites[i]);

            // Outline
            const sprite = new PIXI.Sprite(texture);
            sprite.on('pointerover', this.hover.bind(this, box));
            sprite.on('pointerout', this.unhover.bind(this, box));
            sprite.on('pointerdown', this.click.bind(this, box));
            sprite.interactive = sprite.buttonMode = true;
            box.addChild(sprite);
            switch (i) {
                case 5:
                    box.position.set(0, 0);
                    rows[2].addChild(box);
                    break;
                case 3:
                case 4:
                    box.position.set(this.boxHeight * (i - 3), 0);
                    rows[1].addChild(box);
                    break;
                default:
                    box.position.set(this.boxHeight * i, 0);
                    rows[0].addChild(box);
            }

            // Overlay
            const overlay = new PIXI.Graphics;
            overlay.beginFill(logoTints[i], 0.6);
            overlay.moveTo(5, 5);
            overlay.lineTo(200, 5);
            overlay.lineTo(200, 200);
            overlay.lineTo(5, 200);
            overlay.alpha = 0;
            box.addChild(overlay);

            // Pull Up
            const pullUp = new PIXI.Graphics;
            pullUp.beginFill(0xFF4E2A, 1);
            pullUp.moveTo(5, 0);
            pullUp.lineTo(200, 0);
            pullUp.lineTo(200, 66);
            pullUp.lineTo(5, 66);
            pullUp.position.y = 200;
            pullUp.height = 0;
            // pullUp.height = 0;
            box.addChild(pullUp);

            // Pull Up Text
            const text = new PIXI.Text(this.textBlocks[i].s);
            text.anchor.set(0.5, 2);
            text.position.set(100, 200);
            text.alpha = 0;
            box.addChild(text);
        }
        this.boxCont.addChild(rows[0], rows[1], rows[2]);
        this._fg.addChild(this.boxCont);

        this._content.alpha = 0;
        this._fg.addChild(this._content);

        const contentSize = {
            xl: { x: 600, y: 750 }, lg: { x: 400, y: 640 },
            md: { x: 800, y: 640 }, sm: { x: 500, y: 400 }
        };

        /* ** Content xl ** */
        // Content Outline
        const contentxl = new PIXI.Graphics;
        contentxl.lineStyle(5, 0xFF4E2A);
        contentxl.drawRect(0, 0, contentSize.xl.x, contentSize.xl.y);
        const spritexl = new PIXI.Sprite(contentxl.generateCanvasTexture());

        // Content Shadow
        const shadowGraphicsxl = new PIXI.Graphics;
        shadowGraphicsxl.beginFill(0x000000, 0.7);
        shadowGraphicsxl.drawRect(0, 0, contentSize.xl.x, contentSize.xl.y);
        const shadowxl = CanvasService.createShadow(shadowGraphicsxl);
        shadowxl.position.set(20, 20);

        // Content Text
        const textxl = new PIXI.Text('This is the xl text');
        this.media.xl.addChild(shadowxl);
        this.media.xl.addChild(textxl);
        this.media.xl.addChild(spritexl);

        /* ** Content lg ** */
        // Content Outline
        const contentlg = new PIXI.Graphics;
        contentlg.lineStyle(4, 0xFF4E2A);
        contentlg.drawRect(0, 0, contentSize.lg.x, contentSize.lg.y);
        const spritelg = new PIXI.Sprite(contentlg.generateCanvasTexture());

        // Content Shadow
        const shadowGraphicslg = new PIXI.Graphics;
        shadowGraphicslg.beginFill(0x000000, 0.7);
        shadowGraphicslg.drawRect(0, 0, contentSize.lg.x, contentSize.lg.y);
        const shadowlg = CanvasService.createShadow(shadowGraphicslg);
        shadowlg.position.set(20, 20);


        // Content Text
        const textlg = new PIXI.Text('This is the large text');
        this.media.lg.addChild(shadowlg);
        this.media.lg.addChild(textlg);
        this.media.lg.addChild(spritelg);

        /* ** Content md ** */
        this.media.md = new PIXI.Container;
        const fake1 = new PIXI.Container;
        const fake2 = new PIXI.Container;

        // Content Outline
        this.media.md.width = contentSize.md.x;
        this.media.md.height = contentSize.md.y;
        // contentmd.position.x = 800;
        const textmdh = new PIXI.Text('');
        const testStyle = new PIXI.TextStyle({
            align: 'right',
            dropShadow: true,
            dropShadowDistance: 20,
            dropShadowAngle: 1,
            dropShadowBlur: 30,
            dropShadowAlpha: 0.1
        });
        textmdh.style = testStyle;
        textmdh.position.x = 200;
        const textmdc = new PIXI.Text('This is the medium text');
        textmdc.style = testStyle;
        textmdc.position.set(0, 205);

        this.media.md.addChild(fake1);
        this.media.md.addChild(textmdh);
        this.media.md.addChild(textmdc);
        // Content Shadow

        /* ** Content sm ** */
        // Content Outline
        const contentsm = new PIXI.Container;
        contentsm.width = contentSize.sm.x;
        contentsm.height = contentSize.sm.y;
        // contentmd.position.x = 800;
        const textsm = new PIXI.Text('This is the small text');
        textsm.style = testStyle;
        this.media.sm.addChild(fake2);
        this.media.sm.addChild(textsm);
        // Content Shadow
        // this.addTicker();
        // const rows = (this._fg.children[0] as PIXI.Container).children;
        // const content = (this._fg.children[1] as PIXI.Container);
        

        this._isInit = true;
    }

    hover(box: PIXI.Container) {
        // TweenLite.to(box.children[4], 0.2, { alpha: 1, ease: Power1.easeIn });
        if (box !== this.boxArray[this.clickIndex]) {
            TweenLite.to(box.children[5], 0.2, { height: 66, ease: Power1.easeIn });
            TweenLite.to(box.children[5].position, 0.2, { y: 134, ease: Power1.easeIn });
            TweenLite.to(box.children[6], 0.2, { alpha: 1, ease: Power1.easeIn, delay: 0.2 });
        }
        // this.hoverSquare = sprite;
        // sprite.skew.set(sprite.position.x - this.mousePosition.x, sprite.position.y - this.mousePosition.y);
    }
    unhover(box: PIXI.Container) {
        console.log(box);
        this.hoverSquare = null;
        // TweenLite.to(box.children[4], 0.2, { alpha: 0, ease: Power1.easeOut });
        if (box !== this.boxArray[this.clickIndex]) {
            TweenLite.to(box.children[6], 0.2, { alpha: 0, ease: Power1.easeIn });
            TweenLite.to(box.children[6], 0.2, { alpha: 0, ease: Power1.easeIn, delay: 0.2 });
            TweenLite.to(box.children[5], 0.2, { height: 0, ease: Power1.easeOut, delay: 0.2 });
            TweenLite.to(box.children[5].position, 0.2, { y: 200, ease: Power1.easeOut, delay: 0.2 });
        }
        // sprite.skew.set(0, 0);
    }

    click(box: PIXI.Container) {
        if (this.clickIndex !== -1)
            this.unclick();
        this.clickIndex = this.boxArray.indexOf(box);
        // this.contentText = this.textBlocks[this.clickIndex];
        TweenLite.to(box.children[4], 0.2, { alpha: 1, ease: Power1.easeIn });
        TweenLite.to(box.children[5], 0.2, { height: 66, ease: Power1.easeIn });
        TweenLite.to(box.children[5].position, 0.2, { y: 134, ease: Power1.easeIn });
    }

    unclick() {
        const contentText = (this._content.children[0] as PIXI.Container).children as PIXI.Text[];
        contentText[1].text = contentText[2].text = '';
        TweenLite.to(this.boxArray[this.clickIndex].children[6], 0.2, { alpha: 0, ease: Power1.easeIn });
        TweenLite.to(this.boxArray[this.clickIndex].children[4], 0.2, { alpha: 0, ease: Power1.easeOut });
        TweenLite.to(this.boxArray[this.clickIndex].children[5], 0.2, { height: 0, ease: Power1.easeOut });
        TweenLite.to(this.boxArray[this.clickIndex].children[5].position, 0.2, { y: 200, ease: Power1.easeOut });
    }


    resize = () => {
        console.log(this.props);
        this._background.position.set(this.props.positions.innerWidth * 1.5, this.props.positions.halfHeight);
        this.boxCont.position.set(135, this.props.positions.halfHeight - this.boxCont.height / 2);
        this._content.removeChildren();
        if (this.props.positions.innerWidth > 1600) {
            this._content.addChild(this.media.xl);
            this._content.height = this.props.positions.innerHeight - 200;
            this._content.position.set(this.props.positions.innerWidth * 0.88 - this._content.width,
                this.props.positions.halfHeight - this._content.height / 2);
        } else if (this.props.positions.innerWidth > 1350) {
            this._content.addChild(this.media.lg);
            this._content.height = 640;
            this._content.position.set(this.props.positions.innerWidth * 0.89 - this._content.width,
                this.props.positions.halfHeight - this._content.height / 2);
        } else if (this.props.positions.innerWidth > 1180) {
            this._content.addChild(this.media.md);
            this._content.position.set(550, this.boxCont.y);
        } else {
            this._content.addChild(this.media.sm);
            this._content.position.set(350, this.boxCont.y + 210);
        }
    }

    addTicker() {
        this.props.app.ticker.add(delta => {
            if (this.clickIndex !== -1) {
                const content = (this._content.children[0] as PIXI.Container).children as PIXI.Text[];
                content[1].text = this.textBlocks[this.clickIndex].h;
                content[2].text = this.textBlocks[this.clickIndex].c;
            }
            const mousePosition = this.props.app.renderer.plugins.interaction.mouse.global;
            this.mousePosition = mousePosition;
        });
    }

    open = () => {
        this._fg.addChildAt(this.boxCont, 0);
        this._content = this._fg.children[1] as PIXI.Container;
        const rows = (this._fg.children[0] as PIXI.Container).children;
        
        this._animations = [];
        for (let i = 0; i < rows.length; i++) {
            this._animations.push(
                TweenLite.to(rows[i].position, 0.3, { y: i * this.boxHeight, ease: Power2.easeOut, delay: i * 0.05 }),
                TweenLite.to(rows[i], 0.3, { alpha: 1, ease: Power2.easeOut, delay: i * 0.05 })
            )
        }
        setTimeout(() => {
            this._animations.push(TweenLite.fromTo(this._content.position, 0.3, { y: this._content.position.y + 200 }, { y: this._content.position.y }),
                TweenLite.to(this._content, 0.3, { alpha: 1 }))
        }, 300);
        // TODO: add this maybe? - sprites need to be tinted
        // this.canvasService.menus.forEach(m => TweenLite.to(m.sprite, 0.5, { colorize: 0xFF3C1C, colorizeAmount: 1 }));
    }

    close = (page?: number) => {
        this._animations.forEach(a => a.reverse());
        setTimeout(() => {
            TweenLite.to(this._bg.children, 0.5, { rotation: -1 });
            if (this.clickIndex !== -1) {
                this.unclick();
                this.clickIndex = -1;
            }
        }, 500);
    }
}

export default Design
interface IState {
}

interface IContentText {
    h: string;
    s: string;
    c: string;
}