import { Page, IProps, IdesignElements } from './Page';
import { CanvasService } from '../services/canvas.service';
import GSAP, { TweenLite, Power2, Power1 } from 'gsap';
import { ColorReplaceFilter } from '@pixi/filter-color-replace';
import { designContents, DContents } from '../classes/design-content';
import { Styles } from '../components/Canvas';
import * as PIXI from 'pixi.js';

// export class Design extends Component<{ service: DesignService }, { isInit: boolean, isOpen: boolean }>, Page {
export class Design extends Page<IdesignElements> {
    private boxHeight = 200;
    private mousePosition: { x: number, y: number };
    private hoverSquare: PIXI.Sprite;
    private filter = new ColorReplaceFilter(0x00ff00, 0xFF4E2A, 0.2);
    private boxCont = new PIXI.Container;
    private boxArray: PIXI.Container[] = [];
    private media = {
        xl: new PIXI.Graphics,
        lg: new PIXI.Graphics,
        md: new PIXI.Container,
        sm: new PIXI.Container
    };
    private backgrounds: PIXI.Sprite[] = [];
    // private content: PIXI.Container;
    private clickIndex = -1;
    constructor(props: IProps<IdesignElements>) {
        super(props)
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x3D6999, 1);
        graphics.drawRect(0, 0, this.props.positions.innerWidth, this.props.positions.innerHeight);
        graphics.endFill();
        // const texture = graphics.generateCanvasTexture();
        const texture = this.props.renderer.generateTexture(graphics, 1, 1);
        this._background = new PIXI.Sprite(texture);
        this._background.anchor.set(1.5, 0.5);
        this._background.rotation = -1;
        this._open();
    }

    init = () => {
        const graphics = new PIXI.Graphics;
        graphics.lineStyle(5, 0x00FF00);
        graphics.moveTo(0, 0);
        graphics.drawRect(0, 0, this.boxHeight, this.boxHeight);
        // const texture = graphics.generateCanvasTexture();
        const texture = this.props.renderer.generateTexture(graphics, 1, 1)

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

        // Bg
        this.backgrounds = [
            PIXI.Sprite.from(designContents[DContents.Kahani].bg),
            PIXI.Sprite.from(designContents[DContents.OpenGarage].bg),
            PIXI.Sprite.from(designContents[DContents.WMI].bg),
            PIXI.Sprite.from(designContents[DContents.DD].bg),
            PIXI.Sprite.from(designContents[DContents.SS].bg),
            PIXI.Sprite.from(designContents[DContents.Sourcerer].bg)
        ];

        // Logos
        const logoSprites: PIXI.Sprite[] = [
            PIXI.Sprite.from(designContents[DContents.Kahani].img),
            PIXI.Sprite.from(designContents[DContents.OpenGarage].img),
            PIXI.Sprite.from(designContents[DContents.WMI].img),
            PIXI.Sprite.from(designContents[DContents.DD].img),
            PIXI.Sprite.from(designContents[DContents.SS].img),
            PIXI.Sprite.from(designContents[DContents.Sourcerer].img)
        ];
        const logoTints = [0xFF6B40, 0xFF815D, 0xFF9779, 0xFFB5A0, 0xFFD3C6, 0xFFEDE8]; // In Order
        // const logoTints = [0xFFEDE8, 0xFFB5A0, 0xFF9779, 0xFFD3C6, 0xFF815D, 0xFF6B40];
        for (let i = 0; i < 6; i++) {
            const box = new PIXI.Container();
            this.boxArray.push(box);
            // Shadow
            const shadow = CanvasService.createShadow(shadowGraphics, this.props.renderer);
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
            const text = new PIXI.Text(designContents[i].shortName, CanvasService.styles[Styles.design]);
            text.anchor.set(0.5, 1.5);
            text.position.set(100, 200);
            text.alpha = 0;
            box.addChild(text);
        }
        this.boxCont.addChild(rows[0], rows[1], rows[2]);
        this._fg.addChild(this.boxCont);

        this._content.alpha = 0;
        // this._fg.addChild(this._content);

        const contentSize = {
            xl: { x: 600, y: 750 }, lg: { x: 400, y: 640 },
            md: { x: 800, y: 640 }, sm: { x: 500, y: 400 }
        };

        /* ** Content xl ** */
        // Content Outline
        const contentxl = new PIXI.Graphics;
        contentxl.lineStyle(5, 0x00FF00);
        contentxl.drawRect(0, 0, contentSize.xl.x, contentSize.xl.y);
        // const spritexl = new PIXI.Sprite(contentxl.generateCanvasTexture());
        const spritexl = new PIXI.Sprite(this.props.renderer.generateTexture(contentxl, 1, 1));

        // Content Shadow
        const shadowGraphicsxl = new PIXI.Graphics;
        shadowGraphicsxl.beginFill(0x000000, 0.7);
        shadowGraphicsxl.drawRect(0, 0, contentSize.xl.x, contentSize.xl.y);
        const shadowxl = CanvasService.createShadow(shadowGraphicsxl, this.props.renderer);
        shadowxl.position.set(20, 20);

        // Content Text
        const textxlName = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textxlName.position.set(10, 5);
        const textxlSub = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textxlSub.position.set(10, 55);
        const textxlCode = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textxlCode.position.set(10, 105);
        const textxlComp = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textxlComp.position.set(10, 155);
        const textxlLink = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textxlLink.buttonMode = textxlLink.interactive = true;
        textxlLink.on('click', this.linkClick.bind(this));
        textxlLink.position.set(10, 205);
        this.media.xl.addChild(shadowxl);
        this.media.xl.addChild(textxlName, textxlSub, textxlCode, textxlComp, textxlLink);
        this.media.xl.addChild(spritexl);

        /* ** Content lg ** */
        // Content Outline
        const contentlg = new PIXI.Graphics;
        contentlg.lineStyle(4, 0x00FF00);
        contentlg.drawRect(0, 0, contentSize.lg.x, contentSize.lg.y);
        // const spritelg = new PIXI.Sprite(contentlg.generateCanvasTexture());
        const spritelg = new PIXI.Sprite(this.props.renderer.generateTexture(contentlg, 1, 1));

        // Content Shadow
        const shadowGraphicslg = new PIXI.Graphics;
        shadowGraphicslg.beginFill(0x000000, 0.7);
        shadowGraphicslg.drawRect(0, 0, contentSize.lg.x, contentSize.lg.y);
        const shadowlg = CanvasService.createShadow(shadowGraphicslg, this.props.renderer);
        shadowlg.position.set(20, 20);


        // Content Text
        const textlgName = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textlgName.position.set(10, 5);
        const textlgSub = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textlgSub.position.set(10, 55);
        const textlgCode = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textlgCode.position.set(10, 105);
        const textlgComp = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textlgComp.position.set(10, 155);
        const textlgLink = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textlgLink.position.set(10, 205);
        textlgLink.buttonMode = textlgLink.interactive = true;
        textlgLink.on('click', this.linkClick.bind(this));
        this.media.lg.addChild(shadowlg);
        this.media.lg.addChild(textlgName, textlgSub, textlgCode, textlgComp, textlgLink);
        this.media.lg.addChild(spritelg);

        /* ** Content md ** */
        this.media.md = new PIXI.Container;
        const fake1 = new PIXI.Container;
        const fake2 = new PIXI.Container;

        // Content Outline
        this.media.md.width = contentSize.md.x;
        this.media.md.height = contentSize.md.y;
        // contentmd.position.x = 800;
        const textmdName = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textmdName.position.x = this.boxHeight;
        const textmdSub = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textmdSub.position.y = this.boxHeight + 5;
        const textmdCode = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textmdCode.position.y = this.boxHeight + 55;
        const textmdComp = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textmdComp.position.y = this.boxHeight + 105;
        const textmdLink = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textmdLink.position.x = -this.boxHeight;
        textmdLink.position.y = 2 * this.boxHeight + 5;
        textmdLink.buttonMode = textmdLink.interactive = true;
        textmdLink.on('click', this.linkClick.bind(this));
        this.media.md.addChild(fake1);
        this.media.md.addChild(textmdName, textmdSub, textmdCode, textmdComp);
        this.media.md.addChild(textmdLink);
        // Content Shadow

        /* ** Content sm ** */
        // Content Outline
        const contentsm = new PIXI.Container;
        contentsm.width = contentSize.sm.x;
        contentsm.height = contentSize.sm.y;
        // contentmd.position.x = 800;
        const textsmName = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textsmName.position.x = this.boxHeight;
        const textsmSub = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textsmSub.position.y = this.boxHeight + 5;
        const textsmCode = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textsmCode.position.y = this.boxHeight + 55;
        const textsmComp = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textsmComp.position.y = this.boxHeight + 105;
        const textsmLink = new PIXI.Text('', CanvasService.styles[Styles.design]);
        textsmLink.position.y = this.boxHeight + 155;
        textsmLink.buttonMode = textsmLink.interactive = true;
        textsmLink.on('click', this.linkClick.bind(this));
        this.media.sm.addChild(fake2);
        this.media.sm.addChild(textsmName, textsmSub, textsmCode, textsmComp);
        this.media.sm.addChild(textsmLink);
        // Content Shadow
        this.addTicker();
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
            // TweenLite.to(this.backgrounds[this.clickIndex + 1], 0.2, { alpha: 0.7, rotation: 0.1, ease: Power1.easeIn, delay: 0.2 });
        }
        // this.hoverSquare = sprite;
        // sprite.skew.set(sprite.position.x - this.mousePosition.x, sprite.position.y - this.mousePosition.y);
    }
    unhover(box: PIXI.Container) {
        // console.log(box);
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
            // console.log(this._container);
            // this._background = this.backgrounds[DContents.SS];
        this.clickIndex = this.boxArray.indexOf(box);
        TweenLite.to(box.children[4], 0.2, { alpha: 1, ease: Power1.easeIn });
        TweenLite.to(box.children[5], 0.2, { height: 66, ease: Power1.easeIn });
        TweenLite.to(box.children[5].position, 0.2, { y: 134, ease: Power1.easeIn });
        console.log(this.clickIndex);
        const bg = (this._container.children[0] as PIXI.Container).children[this.clickIndex + 1];
        TweenLite.to(bg, 0.2, { alpha: 1, ease: Power1.easeIn });
        // ((this._content.children[0] as PIXI.Container).children as PIXI.Text[]).forEach(t => t.style.fill = 'white');
        const contentText = (this._content.children[0] as PIXI.Container).children as PIXI.Text[];
        if (this.clickIndex != 4)
            if (this.clickIndex == 2 || this.clickIndex == 3)
                contentText[1].style.fill = '#D3D3D3';
            else
                contentText[1].style.fill = '#ffffff';
        else
            contentText[1].style.fill = '#000000';
        this.recolor(0x0000ff);
        // contentText[2].text = '';
        // contentText[3].text = '';
        // contentText[4].text = '';
        // contentText[5].text = '';
    }

    unclick() {
        const contentText = (this._content.children[0] as PIXI.Container).children as PIXI.Text[];
        contentText[1].text = '';
        contentText[2].text = '';
        contentText[3].text = '';
        contentText[4].text = '';
        contentText[5].text = '';
        this.recolor();
        TweenLite.to(this.boxArray[this.clickIndex].children[6], 0.2, { alpha: 0, ease: Power1.easeIn });
        TweenLite.to(this.boxArray[this.clickIndex].children[4], 0.2, { alpha: 0, ease: Power1.easeOut });
        TweenLite.to(this.boxArray[this.clickIndex].children[5], 0.2, { height: 0, ease: Power1.easeOut });
        TweenLite.to(this.boxArray[this.clickIndex].children[5].position, 0.2, { y: 200, ease: Power1.easeOut });
        const bg = (this._container.children[0] as PIXI.Container).children[this.clickIndex + 1];
        TweenLite.to(bg, 0.2, { alpha: 0, ease: Power1.easeIn });
    }

    linkClick() {
        window.open(designContents[this.clickIndex].link);
    }

    recolor(color: number = 0xFF4E2A) {
        this.filter.newColor = color;
    }


    resize = () => {
        this._background.position.set(this.props.positions.innerWidth * 1.5, this.props.positions.halfHeight);
        this.backgrounds.forEach(b => {
            const pageRatio = this.props.positions.innerHeight / this.props.positions.innerWidth;
            const boxRatio = b.height / b.width;
            if (boxRatio < 1 && pageRatio < 1) {
                console.log("br1");
                b.height = this.props.positions.innerHeight;
            }            
            else
                b.width = this.props.positions.innerWidth;
            b.anchor.set(0.5);
            b.position.set(this.props.positions.halfWidth, this.props.positions.halfHeight);
        });
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
        this.props.ticker.add(delta => {
            if (this.clickIndex !== -1) {
                const content = (this._content.children[0] as PIXI.Container).children as PIXI.Text[];
                content[1].text = designContents[this.clickIndex].name;
                content[2].text = designContents[this.clickIndex].sub;
                content[3].text = 'Code: ' + designContents[this.clickIndex].code;
                content[4].text = 'Completion: ' + designContents[this.clickIndex].completion;
                content[5].text = 'Link: ' + designContents[this.clickIndex].linkName;
                // content[2].text = designContents[this.clickIndex].sub;
            }
            const mousePosition = this.props.renderer.plugins.interaction.mouse.global;
            this.mousePosition = mousePosition;
        });
    }

    open = () => {
        this.backgrounds.forEach(bg => {
            bg.alpha = 0;
            (this._container.children[0] as PIXI.Container).addChild(bg);
        });
        this._fg.addChildAt(this.boxCont, 0);
        this._content = this._fg.children[1] as PIXI.Container;
        this._fg.filters = [this.filter];
        this.resize();
        // matrix[1] = 117117;
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