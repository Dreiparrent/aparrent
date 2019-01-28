import React, { Component, Suspense } from 'react'
import { Styles, IText, IPositions } from '../components/Canvas';
import { CanvasService } from '../services/canvas.service';
import { Page, IhomeElements, IProps } from './Page';
import GSAP, { TweenLite } from 'gsap';

export class Home extends Page<IhomeElements, { isInit: boolean }> {
    private text: IText[] = [
        {
            text: 'Andrei Parrent',
            style: Styles.extraLarge,
            position: () => {
                return { // Name
                    x: this.props.positions.halfWidth, y: this.props.positions.halfHeight
                };
            },
            anchor: { x: 0.5, y: 0.5 },
            rotation: 0
        },
        {
            text: 'My Name',
            style: Styles.medium,
            anchor: { x: -0.2, y: 4 },
            position: () => {
                return { // Name
                    x: this.props.positions.halfWidth, y: this.props.positions.halfHeight
                };
            },
            rotation: 0
        },
        {
            text: 'Scroll up to see photography',
            style: Styles.large,
            anchor: { x: 2, y: 1 },
            position: () => {
                return { // Name
                    x: this.props.positions.innerWidth + (window.innerWidth / 30),
                    y: this.props.positions.halfHeight
                };
            },
            rotation: 0.5
        },
        {
            text: 'Scroll down to see design',
            style: Styles.large,
            anchor: { x: 2, y: 0 },
            position: () => {
                return { // Name
                    x: this.props.positions.innerWidth + (window.innerWidth / 30),
                    y: this.props.positions.halfHeight
                };
            },
            rotation: -0.5
        },
        {
            text: 'This is a menu',
            style: Styles.medium,
            anchor: { x: -0.2, y: 5 },
            position: () => {
                return { // Name
                    x: 0, y: this.props.positions.halfHeight
                };
            },
            rotation: 0.5
        },
        {
            text: 'For my fans',
            style: Styles.medium,
            anchor: { x: 0, y: -0.1 },
            position: () => {
                return { // Name
                    x: 300, y: 0
                };
            },
            rotation: 0
        },
        {
            text: 'Click here if you\'re unsure',
            style: Styles.small,
            anchor: { x: 0, y: 2.5 },
            position: () => {
                return { // Name
                    x: 0, y: this.props.positions.innerHeight
                };
            },
            rotation: 0.55
        },
    ];
    private get arrows() {
        return [
            { // Fans
                sX: 280,
                sY: 30,
                cX: 250,
                cY: 38,
                eX: 210,
                eY: 25,
                r: 0.1
            },
            { // Menu
                sX: 180,
                sY: this.props.positions.halfHeight - 100,
                cX: 160,
                cY: this.props.positions.halfHeight - 55,
                eX: 80,
                eY: this.props.positions.halfHeight - 35,
                r: -0.2
            },
            { // Unsure
                sX: 130,
                sY: this.props.positions.innerHeight - 50,
                cX: 105,
                cY: this.props.positions.innerHeight - 55,
                eX: 70,
                eY: this.props.positions.innerHeight - 30,
                r: -0.5
            },
            { // My Name
                sX: this.props.positions.halfWidth + 50,
                sY: this.props.positions.halfHeight - 150,
                cX: this.props.positions.halfWidth - 15,
                cY: this.props.positions.halfHeight - 110,
                eX: this.props.positions.halfWidth - 20,
                eY: this.props.positions.halfHeight - 50,
                r: -1.4
            },
            { // Scroll Up
                sX: this.props.positions.innerWidth - 250,
                sY: this.props.positions.halfHeight - 300,
                cX: this.props.positions.innerWidth - 150,
                cY: this.props.positions.halfHeight / 2,
                eX: this.props.positions.innerWidth - 150,
                eY: 30,
                r: 1.6
            },
            { // Scroll Up Menu
                sX: this.props.positions.innerWidth - 200,
                sY: this.props.positions.halfHeight - 170,
                cX: this.props.positions.innerWidth - 200,
                cY: this.props.positions.halfHeight - 120,
                eX: this.props.positions.innerWidth - 150,
                eY: this.props.positions.halfHeight - 100,
                r: -2.7
            },
            { // Scroll Down
                sX: this.props.positions.innerWidth - 270,
                sY: this.props.positions.halfHeight + 300,
                cX: this.props.positions.innerWidth - 320,
                cY: this.props.positions.innerHeight - 90,
                eX: this.props.positions.innerWidth - 300,
                eY: this.props.positions.innerHeight - 30,
                r: -1.8
            },
            { // Scroll Down Menu
                sX: this.props.positions.innerWidth - 180,
                sY: this.props.positions.halfHeight + 250,
                cX: this.props.positions.innerWidth - 90,
                cY: this.props.positions.halfHeight + 255,
                eX: this.props.positions.innerWidth - 80,
                eY: this.props.positions.halfHeight + 180,
                r: 1.8
            }
        ];
    }
    private arrowTexture = PIXI.Texture.fromImage('assets/arrowHead.png');
    public arrowContainer = new PIXI.Container;
    public arrowLines = new PIXI.Graphics;
    constructor(props: IProps<IhomeElements>) /* IProps */ {
        super(props)
        /*
        this.state = {
            tilingSprite: new PIXI.extras.TilingSprite(texture, this.app.screen.width, this.app.screen.height),
            graphics: new PIXI.Graphics
        }
        */
        TweenLite.to(this._fg, 0.5, { x: 0, y: 0 });
        this._open();
    }

    init = () => {
        this.text.forEach(t => {
            const txt = new PIXI.Text(t.text, CanvasService.styles[t.style]);
            txt.anchor.set(t.anchor.x, t.anchor.y);
            txt.rotation = t.rotation;
            this._content.addChild(txt);
            // this._fg.addChild(txt);
            // t.element = txt;
        });
        this.setArrows();
        this._isInit = true;
    }
    open = () => {
        this._fg.addChild(this.arrowContainer);
    }
    componentWillUnmount() {
        // this.props.elements.container.removeChildren();
    }
    close = (page: number) => {
        if (page == 1)
            TweenLite.to(this._fg, 0.5, { x: 250, y: -this.props.positions.innerHeight });
        else TweenLite.to(this._fg, 0.5, { x: 250, y: this.props.positions.innerHeight });
    }
    setArrows() {
        this.arrowContainer.removeChildren();
        this.arrowLines.clear();
        this.arrowLines.lineStyle(5, 0x000000, 1);
        this.arrows.forEach(a => {
            this.arrowLines.moveTo(a.sX, a.sY);
            this.arrowLines.quadraticCurveTo(a.cX, a.cY, a.eX, a.eY);
            const arrowHead = new PIXI.Sprite(this.arrowTexture);
            arrowHead.anchor.set(0.2, 0.5);
            arrowHead.position.set(a.eX, a.eY);
            arrowHead.rotation = a.r;
            this.arrowContainer.addChild(arrowHead);
        });
        this._fg.addChild(this.arrowLines);
        this.arrowLines.lineStyle(0);
    }

    positionText() {
        this._content.children.forEach((c, i) => {
            c.position.set(this.text[i].position().x, this.text[i].position().y)
        });
    }

    resize = () => {
        this.positionText();
        this.setArrows();
        console.log('resize');
    }

}

export default Home
interface IState {
    tilingSprite: PIXI.Sprite;
    graphics: PIXI.Graphics;
}