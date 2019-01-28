import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import { RouteComponentProps } from 'react-router';
import { Pages, IProps } from '../App';
import { CanvasService } from '../services/canvas.service';
import { FansMenu } from '../classes/fans-menu';
import { IMenuClass } from '../classes/menu';
import { ScrollMenu } from '../classes/scroll-menu';
import { UnsureMenu } from '../classes/unsure-menu';
import { MainMenu } from '../classes/main-menu.';
import { IPage } from '../pages/Page';
export class Canvas extends Component<IProps, IState> {
    public myRef: React.RefObject<HTMLDivElement>;
    private styles: PIXI.TextStyleOptions[] = [
        {
            fontSize: 97,
            align: 'center'
        },
        {
            fontSize: 48,
            wordWrap: true,
            wordWrapWidth: 300
        },
        {
            fontSize: 42,
            align: 'center'
        },
        {
            fontSize: 32,
            wordWrap: true,
            wordWrapWidth: 200
        },
        {
            fill: '#ffffff',
            fontSize: 48,
            wordWrap: true,
            wordWrapWidth: 200
        },
        {
            fill: '#ffffff',
            fontSize: 42,
            wordWrap: true,
            wordWrapWidth: 200
        },
        {
            fill: '#ffffff',
            fontSize: 32,
            wordWrap: true,
            wordWrapWidth: 200
        },
        {
            fill: '#ffffff',
            fontSize: 48,
            wordWrap: true,
            wordWrapWidth: 300,
            dropShadow: true,
            dropShadowColor: 0xFFFFFF,
            dropShadowDistance: 0,
            dropShadowBlur: 19
        }
    ];
    private hider: any;
    private scrollIndex: number;
    private hInit = false;
    private pInit = false;
    private dIniit = false;
    constructor(props: IProps) {
        super(props);
        const texture = PIXI.Texture.fromImage('assets/grid.png');
        const app = new PIXI.Application({
            autoResize: true,
            resolution: devicePixelRatio,
            antialias: true
        });
        this.state = {
            app: app,
            positions: {
                innerWidth: 0,
                innerHeight: 0,
                halfWidth: 0,
                halfHeight: 0
            },
            menuContainer: new PIXI.Container(),
            hasMenu: false,
            background: new PIXI.extras.TilingSprite(texture, app.screen.width, app.screen.height),
            menus: [],
            Home: null,
            Design: null,
            Photography: null,
            fullscreen: false
        }
        this.myRef = React.createRef();
        this.state.app.stage.addChild(this.state.background);
        this.styles.forEach(s => {
            const style = new PIXI.TextStyle(s);
            style.fontFamily = 'Ludicrous';
            CanvasService.styles.push(style);
        });
        this.scrollIndex = this.props.page;
        this.Page = this.Page.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onKey = this.onKey.bind(this);
        this.relayMenus = this.relayMenus.bind(this);
        this.fullscreen = this.fullscreen.bind(this);
    }
    componentWillMount() {
        this.onResize();
        window.addEventListener("resize", this.onResize);
        window.addEventListener('wheel', this.onScroll);
        document.addEventListener('keydown', this.onKey);
    }
    componentDidMount() {
        if (this.myRef.current)
            this.myRef.current.appendChild(this.state.app.view);
        
        this.createMenus();
    }
    public createMenus() {
        this.state.menus.push(
            new MainMenu(this.state.positions, this.state.menuContainer),
            new FansMenu(this.state.positions, this.state.menuContainer),
            new ScrollMenu(this.state.positions, this.state.menuContainer),
            new UnsureMenu(this.state.positions, this.state.menuContainer),
        );
        this.setState({ hasMenu: true });
    }

    Page( page: Pages) {
        switch (page) {
            case Pages.design:
                if (!this.dIniit) {
                    this.dIniit = true;
                    import('../pages/Design').then(i => {
                        this.setState({
                            Design: new i.Design({
                                relayMenus: this.relayMenus,
                                positions: this.state.positions,
                                app: this.state.app,
                                fullscreen: this.fullscreen
                            })
                        });
                    })
                };
                break;
            case Pages.photography:
                if (!this.pInit) {
                    this.pInit = true;
                    import('../pages/Photography').then(i => {
                        this.setState({
                            Photography: new i.Photography({
                                relayMenus: this.relayMenus,
                                positions: this.state.positions,
                                app: this.state.app,
                                fullscreen: this.fullscreen
                            })
                        })
                    })
                }
                break;
            default:
                if (!this.hInit) {
                    this.hInit = true;
                    import('../pages/Home').then(i => {
                        this.setState({
                            Home: new i.Home({
                                relayMenus: this.relayMenus,
                                positions: this.state.positions,
                                app: this.state.app,
                                fullscreen: this.fullscreen
                            })
                        });
                    });
                };
                break;
        }
    }
    
    render() {
        this.Page(this.props.page)
        return (
            <div id="desktop" ref={this.myRef}>
                {/* <p>Font</p> */}
            </div>
        )
    }

    relayMenus(remove = this.state.hasMenu) {
        if (remove) {
            this.state.app.stage.removeChild(this.state.menuContainer);
            this.setState({ hasMenu: false });
        } else {
            this.state.app.stage.addChild(this.state.menuContainer);
            this.setState({ hasMenu: true });
        }
    }

    fullscreen() {
        if (!this.state.fullscreen) {
            this.myRef.current.requestFullscreen();
            this.setState({ fullscreen: true });
        } else {
            document.exitFullscreen();
            this.setState({ fullscreen: false });
        }
        this.onResize();
    }
    
    onScroll(e: { deltaY: number;}) {
        this.scrollIndex += e.deltaY > 0 ? 1 : -1;
        clearTimeout(this.hider);
        if (this.scrollIndex < 0) {
            this.scrollIndex = -1;
            if (this.state.Design)
                this.state.Design._close();
            if (this.state.Home)
                this.state.Home._close(-1);
            this.props.route.history.push('/photography');
            if (this.state.Photography)
                this.state.Photography._open();
        } else if (this.scrollIndex > 0) {
            this.scrollIndex = 1;
            if (this.state.Photography)
                this.state.Photography._close();
            if (this.state.Home)
                this.state.Home._close(1);
            this.props.route.history.push('/design');
            if (this.state.Design)
                this.state.Design._open();
        } else {
            if (this.state.Photography)
                this.state.Photography._close();
            if (this.state.Design)
                this.state.Design._close();
            this.scrollIndex = 0;
            this.props.route.history.push('/home');
            if (this.state.Home)
                setTimeout(() => {
                    this.state.Home._open();
                }, 500);
           
        }
    }
    onResize(event?: UIEvent) {
        this.props.checkMobile();
        const positions = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            halfWidth: window.innerWidth / 2,
            halfHeight: window.innerHeight / 2
        };
        this.setState({
            positions: positions
        });
        this.resizeCanvas(positions);
            
    }
    resizeCanvas(positions: IPositions) {
        this.state.app.renderer.resize(positions.innerWidth, positions.innerHeight);
        this.state.background.width = positions.innerWidth;
        this.state.background.height = positions.innerHeight;
        if (this.state.Home)
            this.state.Home._resize(positions);
        if (this.state.Design)
            this.state.Design._resize(positions);
        if (this.state.Photography)
            this.state.Photography._resize(positions);
        this.state.menus.forEach(m => {
            m._resize(positions);
        });
    }

    onKey(e: KeyboardEvent) {
        if (e.key === 'ArrowUp')
            this.onScroll({ deltaY: -1 });
        if (e.key === 'ArrowDown')
            this.onScroll({ deltaY: 1 });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener('wheel', this.onScroll);
        document.removeEventListener('keydown', this.onKey);
        /*
        this.state.app.destroy();
        const canvas = document.body.getElementsByTagName('canvas')[0];
        if (canvas)
            document.body.removeChild(canvas);
            */
    }
}

export default Canvas
// export default withRouter(Canvas);
interface IState {
    app: PIXI.Application;
    positions: IPositions;
    menuContainer: PIXI.Container;
    hasMenu: boolean;
    menus: IMenuClass[];
    background: PIXI.extras.TilingSprite;
    Home: IPage;
    Photography: IPage;
    Design: IPage;
    fullscreen: boolean;
}
export enum Styles {
    extraLarge, large, medium, small, largeWhite, mediumWhite, smallWhite, largeWhiteBlur
}
export interface IPositions {
    innerWidth: number;
    innerHeight: number;
    halfWidth: number;
    halfHeight: number;
}
export enum MenuType {
    'fans', 'scroll', 'menu', 'unsure'
}
export interface IMenu {
    type: MenuType;
    pointTo: number | { x: number, y: number };
    end?: number | { x: number, y: number };
    position: () => { x: number, y: number };
    anchor: { x: number, y: number };
    // sprite?: PIXI.Sprite;
}
export interface IText {
    text: string;
    style: Styles;
    position: () => { x: number, y: number };
    anchor: {
        x: number;
        y: number;
    };
    rotation: number;
    element?: PIXI.Text;
}