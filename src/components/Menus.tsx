import React, { Component } from "react";
import './Menus.scss';
import { Pages } from "../App";

export class Menus extends Component<IProps, IState> {
    public wedgeRef: React.RefObject<HTMLDivElement>;
    
    private wedgeClip: React.RefObject<HTMLDivElement>;
    private fansMenu: React.RefObject<HTMLDivElement>;
    private navMenu: React.RefObject<HTMLDivElement>;
    private subMenu: React.RefObject<HTMLDivElement>;
    private navMenuInner: React.RefObject<HTMLDivElement>;
    private fansComingSoon: React.RefObject<HTMLDivElement>;
    private wedgeMenu: React.RefObject<HTMLDivElement>;
    constructor(props: IProps) {
        super(props);
        this.state = {
            navActive: false,
            navSubDesignActive: true,
            fansActive: false,
            wedgeActive: false
        } 
        this.wedgeRef = React.createRef();
        this.wedgeClip = React.createRef();
        this.fansMenu = React.createRef();
        this.subMenu = React.createRef();
        this.navMenu = React.createRef();
        this.navMenuInner = React.createRef();
        this.fansComingSoon = React.createRef();
        this.wedgeMenu = React.createRef();
        this.wedgeClick = this.wedgeClick.bind(this);
        this.getSubMenu = this.getSubMenu.bind(this);
        this.raiseWedge = this.raiseWedge.bind(this);
        this.resetWedge = this.resetWedge.bind(this);
    }
    getSubMenu(props: {active: boolean}) {//
        if (this.state.navSubDesignActive) {
            return (
                <div>
                    <h3>Kahani</h3>
                    <h3>Open Garage</h3>
                    <h3>WMi</h3>
                    <h3>Dance Database</h3>
                </div>
                
            )
        } else {
            return (
                <div>
                    <h3>All Photos</h3>
                    <h3>Client Photos</h3>
                    <h3>Portfolio</h3>
                </div>
            )
        }
    }
    render() {
        return (
            <div id="menu_outer">
                <div className="menu" id="menu_fans" ref={this.fansMenu} onClick={this.fansClick.bind(this)}>
                    <p ref={this.fansComingSoon}>(coming soon)
                    <br/><br/>
                    <a href="/resume">click for resume</a>
                    </p>
                </div>
                <div id="menu_nav_sub" ref={this.subMenu}>
                    <div id="menu_nav_sub_inner">
                        <h2 onClick={this.navClick.bind(this)}>x</h2>
                        <this.getSubMenu active={this.state.navSubDesignActive}></this.getSubMenu>
                    </div>
                </div>
                <div className="menu" id="menu_nav" onClick={this.navClick.bind(this)} ref={this.navMenu}>
                    <div id="menu_nav_inner" ref={this.navMenuInner}>
                        <h2 onClick={this.designClick.bind(this)} style={{
                            textShadow: this.state.navSubDesignActive ? '2px 2px grey' : 'none'
                        }}>Design</h2>
                        <h2 onClick={this.photoClick.bind(this)}
                            style={{
                                textShadow: this.state.navSubDesignActive ? 'none' : '2px 2px grey'
                        }}>Photography</h2>
                    </div>
                </div>
                <div className="menu" id="menu_scroll">
                    <div id="wedge_clip" ref={this.wedgeClip}>
                        <div id="wedge_rotate" ref={this.wedgeRef}>
                            <div className="wedge" id="wedgep" onClick={this.wedgeClick}>
                                <img src="/assets/icons/mi_photo_camera.png" />
                            </div>
                            <div className="wedge" id="wedgeh" onClick={this.wedgeClick}>
                                <img src="/assets/icons/icon-48.png"/>
                            </div>
                            <div className="wedge" id="wedged" onClick={this.wedgeClick}>
                                <img src="/assets/icons/mi_settings_system_daydream.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="menu_wedge" ref={this.wedgeMenu}>
                    <h4>menu coming soon</h4>
                </div>
            </div>
        )
    }
    private fansClick() {
        if (this.state.fansActive) {
            this.fansMenu.current.style.width = '200px';
            this.fansMenu.current.style.height = '200px';
            this.fansComingSoon.current.style.opacity = '0';
            setTimeout(() => {
                this.fansComingSoon.current.style.display = 'none';
            }, 500);
        } else {
            this.fansMenu.current.style.width = '450px';
            this.fansMenu.current.style.height = '450px';
            this.fansComingSoon.current.style.opacity = '1';
            this.fansComingSoon.current.style.display = 'block';
        }
        this.setState({fansActive: !this.state.fansActive})
    }
    private navClick(e?: React.MouseEvent<HTMLDivElement, MouseEvent>, reset = false) {
        if (!e || this.state.navSubDesignActive && e.currentTarget.tagName !== 'DIV') {
            this.subMenu.current.style.left = '-400px';
            this.navMenu.current.style.borderTop = '50px solid transparent';
            this.navMenu.current.style.borderLeft = '100px solid #00FFFF';
            this.navMenu.current.style.borderBottom = '50px solid transparent';
            this.navMenu.current.style.left = '0';
            this.navMenu.current.style.boxShadow = 'none';
            this.navMenuInner.current.style.opacity = '0';
            setTimeout(() => {
                this.setState({navActive: false})
            }, 500);
        } else {
            this.subMenu.current.style.left = '40px';
            this.navMenu.current.style.borderTop = '100px solid transparent';
            this.navMenu.current.style.borderLeft = '200px solid #00FFFF';
            this.navMenu.current.style.borderBottom = '100px solid transparent';
            this.navMenu.current.style.left = '20px';
            this.navMenuInner.current.style.opacity = '1';
            // this.navMenu.current.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);';
            this.setState({ navActive: true });
        }
    }
    private designClick() {
        this.setState({ navSubDesignActive: true });
        // this.subDesignAcive = true;
        // console.log('design');
    }
    private photoClick() {
        this.setState({ navSubDesignActive: false });
        // this.subDesignAcive = false;
        // console.log('photo');
    }
    private wedgeClick() {        
        if (this.state.wedgeActive) {
            this.wedgeMenu.current.style.top = '100vh';
            this.resetWedge();
        } else {
            this.wedgeMenu.current.style.top = '10vh';
            switch (this.props.page) {
                case (Pages.photography):
                    this.wedgeMenu.current.className = 'wedge wp-active';
                    break;
                case Pages.design:
                    this.wedgeMenu.current.className = 'wedge wd-active';                    
                    break;
                default:
                    this.wedgeMenu.current.className = 'wedge wh-active';                    
                    break;
            }
            this.raiseWedge();
        }
        this.setState({ wedgeActive: !this.state.wedgeActive });
    }
    public raiseWedge() {
        this.wedgeClip.current.style.bottom = '60px';
    }
    public resetWedge() {
        this.wedgeClip.current.style.bottom = '25px';
    }
    public close() {
        if (this.state.fansActive)
            this.fansClick();
        if (this.state.navActive)
            this.navClick()
        if (this.state.wedgeActive)
            this.wedgeClick();
    }
}
interface IProps {
    page: Pages
}
interface IState {
    navActive: boolean;
    navSubDesignActive: boolean;
    fansActive: boolean;
    wedgeActive: boolean;
}